"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const t = __importStar(require("./types"));
/**
 * A wrapper for `ts.createProgram`
 * @param files The files to later be parsed with `parseFromProgram`
 * @param options The options to pass to the compiler
 */
function createProgram(files, options) {
    return ts.createProgram(files, options);
}
exports.createProgram = createProgram;
/**
 * Creates a program, parses the specified file and returns the PropTypes as an AST, if you need to parse more than one file
 * use `createProgram` and `parseFromProgram` for better performance
 * @param filePath The file to parse
 * @param options The options from `loadConfig`
 * @param parserOptions Options that specify how the parser should act
 */
function parseFile(filePath, options, parserOptions = {}) {
    const program = ts.createProgram([filePath], options);
    return parseFromProgram(filePath, program, parserOptions);
}
exports.parseFile = parseFile;
/**
 * Parses the specified file and returns the PropTypes as an AST
 * @param filePath The file to get the PropTypes from
 * @param program The program object returned by `createProgram`
 * @param parserOptions Options that specify how the parser should act
 */
function parseFromProgram(filePath, program, parserOptions = {}) {
    const { checkDeclarations = false } = parserOptions;
    const shouldInclude = data => {
        if (parserOptions.shouldInclude) {
            const result = parserOptions.shouldInclude(data);
            if (result !== undefined) {
                return result;
            }
        }
        return data.name !== 'ref';
    };
    const shouldResolveObject = data => {
        if (parserOptions.shouldResolveObject) {
            const result = parserOptions.shouldResolveObject(data);
            if (result !== undefined) {
                return result;
            }
        }
        return data.propertyCount <= 50 && data.depth <= 3;
    };
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(filePath);
    const programNode = t.programNode();
    const reactImports = [];
    if (sourceFile) {
        ts.forEachChild(sourceFile, visitImports);
        ts.forEachChild(sourceFile, visit);
    }
    else {
        throw new Error(`Program doesn't contain file "${filePath}"`);
    }
    return programNode;
    function visitImports(node) {
        if (ts.isImportDeclaration(node) &&
            ts.isStringLiteral(node.moduleSpecifier) &&
            node.moduleSpecifier.text === 'react' &&
            node.importClause) {
            const imports = ['Component', 'PureComponent', 'memo'];
            // import x from 'react'
            if (node.importClause.name) {
                const nameText = node.importClause.name.text;
                reactImports.push(...imports.map(x => `${nameText}.${x}`));
            }
            // import {x, y as z} from 'react'
            const bindings = node.importClause.namedBindings;
            if (bindings) {
                if (ts.isNamedImports(bindings)) {
                    bindings.elements.forEach(spec => {
                        const nameIdentifier = spec.propertyName || spec.name;
                        const nameText = nameIdentifier.getText();
                        if (imports.includes(nameText)) {
                            reactImports.push(spec.name.getText());
                        }
                    });
                }
                // import * as x from 'react'
                else {
                    const nameText = bindings.name.text;
                    reactImports.push(...imports.map(x => `${nameText}.${x}`));
                }
            }
        }
    }
    function visit(node) {
        // function x(props: type) { return <div/> }
        if (ts.isFunctionDeclaration(node) && node.name && node.parameters.length === 1) {
            parseFunctionComponent(node);
        }
        // const x = ...
        else if (ts.isVariableStatement(node)) {
            ts.forEachChild(node.declarationList, variableNode => {
                // x = (props: type) => { return <div/> }
                // x = function(props: type) { return <div/> }
                // x = function y(props: type) { return <div/> }
                // x = react.memo((props:type) { return <div/> })
                if (ts.isVariableDeclaration(variableNode) && variableNode.name) {
                    const type = checker.getTypeAtLocation(variableNode.name);
                    if (!variableNode.initializer) {
                        if (checkDeclarations &&
                            type.aliasSymbol &&
                            type.aliasTypeArguments &&
                            checker.getFullyQualifiedName(type.aliasSymbol) === 'React.ComponentType') {
                            parsePropsType(variableNode.name.getText(), type.aliasTypeArguments[0]);
                        }
                    }
                    else if ((ts.isArrowFunction(variableNode.initializer) ||
                        ts.isFunctionExpression(variableNode.initializer)) &&
                        variableNode.initializer.parameters.length === 1) {
                        parseFunctionComponent(variableNode);
                    }
                    // x = react.memo((props:type) { return <div/> })
                    else if (ts.isCallExpression(variableNode.initializer) &&
                        variableNode.initializer.arguments.length > 0) {
                        const callString = variableNode.initializer.expression.getText();
                        const arg = variableNode.initializer.arguments[0];
                        if (reactImports.includes(callString) &&
                            (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) &&
                            arg.parameters.length > 0) {
                            const symbol = checker.getSymbolAtLocation(arg.parameters[0].name);
                            if (symbol) {
                                parsePropsType(variableNode.name.getText(), checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration));
                            }
                        }
                    }
                }
            });
        }
        else if (ts.isClassDeclaration(node) &&
            node.name &&
            node.heritageClauses &&
            node.heritageClauses.length === 1) {
            const heritage = node.heritageClauses[0];
            if (heritage.types.length !== 1)
                return;
            const arg = heritage.types[0];
            if (!arg.typeArguments)
                return;
            if (reactImports.includes(arg.expression.getText())) {
                parsePropsType(node.name.getText(), checker.getTypeAtLocation(arg.typeArguments[0]));
            }
        }
    }
    function isTypeJSXElementLike(type) {
        if (type.isUnion()) {
            return type.types.every(subType => subType.flags & ts.TypeFlags.Null || isTypeJSXElementLike(subType));
        }
        else if (type.symbol) {
            const name = checker.getFullyQualifiedName(type.symbol);
            return name === 'global.JSX.Element' || name === 'React.ReactElement';
        }
        return false;
    }
    function parseFunctionComponent(node) {
        if (!node.name) {
            return;
        }
        const symbol = checker.getSymbolAtLocation(node.name);
        if (!symbol) {
            return;
        }
        const signature = checker
            .getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
            .getCallSignatures()[0];
        if (!isTypeJSXElementLike(signature.getReturnType())) {
            return;
        }
        const type = checker.getTypeOfSymbolAtLocation(signature.parameters[0], signature.parameters[0].valueDeclaration);
        parsePropsType(node.name.getText(), type);
    }
    function parsePropsType(name, type) {
        const properties = type
            .getProperties()
            .filter(symbol => shouldInclude({ name: symbol.getName(), depth: 1 }));
        if (properties.length === 0) {
            return;
        }
        programNode.body.push(t.componentNode(name, properties.map(x => checkSymbol(x, [type.id]))));
    }
    function checkSymbol(symbol, typeStack) {
        const declarations = symbol.getDeclarations();
        const declaration = declarations && declarations[0];
        // TypeChecker keeps the name for { a: React.ElementType } but not
        // { a?: React.ElementType } can get around this by not using the typechecker
        if (declaration &&
            ts.isPropertySignature(declaration) &&
            declaration.type &&
            ts.isTypeReferenceNode(declaration.type)) {
            const name = declaration.type.typeName.getText();
            if (name === 'React.ElementType' || name === 'React.ComponentType') {
                return t.propTypeNode(symbol.getName(), getDocumentation(symbol), declaration.questionToken
                    ? t.unionNode([t.undefinedNode(), t.elementNode('elementType')])
                    : t.elementNode('elementType'));
            }
        }
        const type = declaration
            ? // The proptypes aren't detailed enough that we need all the different combinations
                // so we just pick the first and ignore the rest
                checker.getTypeOfSymbolAtLocation(symbol, declaration)
            : // The properties of Record<..., ...> don't have a declaration, but the symbol has a type property
                symbol.type;
        if (!type) {
            throw new Error('No types found');
        }
        // Typechecker only gives the type "any" if it's present in a union
        // This means the type of "a" in {a?:any} isn't "any | undefined"
        // So instead we check for the questionmark to detect optional types
        let parsedType = undefined;
        if (type.flags & ts.TypeFlags.Any && declaration && ts.isPropertySignature(declaration)) {
            parsedType = declaration.questionToken
                ? t.unionNode([t.undefinedNode(), t.anyNode()])
                : t.anyNode();
        }
        else {
            parsedType = checkType(type, typeStack, symbol.getName());
        }
        return t.propTypeNode(symbol.getName(), getDocumentation(symbol), parsedType);
    }
    function checkType(type, typeStack, name) {
        // If the typeStack contains type.id we're dealing with an object that references itself.
        // To prevent getting stuck in an infinite loop we just set it to an objectNode
        if (typeStack.includes(type.id)) {
            return t.objectNode();
        }
        {
            const typeNode = type;
            const symbol = typeNode.aliasSymbol ? typeNode.aliasSymbol : typeNode.symbol;
            const typeName = symbol ? checker.getFullyQualifiedName(symbol) : null;
            switch (typeName) {
                case 'global.JSX.Element':
                case 'React.ReactElement': {
                    return t.elementNode('element');
                }
                case 'React.ElementType': {
                    return t.elementNode('elementType');
                }
                case 'React.ReactNode': {
                    return t.unionNode([t.elementNode('node'), t.undefinedNode()]);
                }
                case 'React.Component': {
                    return t.instanceOfNode(typeName);
                }
                case 'Element': {
                    // Nextjs: Element isn't defined on the server
                    return t.instanceOfNode("typeof Element === 'undefined' ? Object : Element");
                }
            }
        }
        // @ts-ignore - Private method
        if (checker.isArrayType(type)) {
            // @ts-ignore - Private method
            const arrayType = checker.getElementTypeOfArrayType(type);
            return t.arrayNode(checkType(arrayType, typeStack, name));
        }
        if (type.isUnion()) {
            return t.unionNode(type.types.map(x => checkType(x, typeStack, name)));
        }
        if (type.flags & ts.TypeFlags.String) {
            return t.stringNode();
        }
        if (type.flags & ts.TypeFlags.Number) {
            return t.numericNode();
        }
        if (type.flags & ts.TypeFlags.Undefined) {
            return t.undefinedNode();
        }
        if (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) {
            return t.anyNode();
        }
        if (type.flags & ts.TypeFlags.Literal) {
            if (type.isLiteral()) {
                return t.literalNode(type.isStringLiteral() ? `"${type.value}"` : type.value, getDocumentation(type.symbol));
            }
            return t.literalNode(checker.typeToString(type));
        }
        if (type.flags & ts.TypeFlags.Null) {
            return t.literalNode('null');
        }
        if (type.getCallSignatures().length) {
            return t.functionNode();
        }
        // Object-like type
        {
            const properties = type.getProperties();
            if (properties.length) {
                if (shouldResolveObject({ name, propertyCount: properties.length, depth: typeStack.length })) {
                    const filtered = properties.filter(symbol => shouldInclude({ name: symbol.getName(), depth: typeStack.length + 1 }));
                    if (filtered.length > 0) {
                        return t.interfaceNode(filtered.map(x => checkSymbol(x, [...typeStack, type.id])));
                    }
                }
                return t.objectNode();
            }
        }
        // Object without properties or object keyword
        if (type.flags & ts.TypeFlags.Object ||
            (type.flags & ts.TypeFlags.NonPrimitive && checker.typeToString(type) === 'object')) {
            return t.objectNode();
        }
        console.warn(`Unable to handle node of type "ts.TypeFlags.${ts.TypeFlags[type.flags]}", using any`);
        return t.anyNode();
    }
    function getDocumentation(symbol) {
        if (!symbol) {
            return undefined;
        }
        const decl = symbol.getDeclarations();
        if (decl) {
            // @ts-ignore - Private method
            const comments = ts.getJSDocCommentsAndTags(decl[0]);
            if (comments && comments.length === 1) {
                const commentNode = comments[0];
                if (ts.isJSDoc(commentNode)) {
                    let commentText = commentNode.comment ? commentNode.comment : '';
                    if (commentNode.tags) {
                        const tags = commentNode.tags
                            .map(tag => tag
                            .getText()
                            .replace(/\* *$/, '')
                            .trim())
                            .reduce((prev, curr) => `${prev}\n${curr}`);
                        commentText = commentText ? `${commentText}\n${tags}` : tags;
                    }
                    return commentText;
                }
            }
        }
        const comment = ts.displayPartsToString(symbol.getDocumentationComment(checker));
        return comment ? comment : undefined;
    }
}
exports.parseFromProgram = parseFromProgram;
//# sourceMappingURL=parser.js.map