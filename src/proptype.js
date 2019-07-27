import inquirer from "inquirer";

const prettier = require("prettier");
const ts = require("./prop-types-conversion/parser");
const gs = require("./prop-types-conversion/generator");
const fs = require("fs");
const path = require("path");
const { parseFile } = ts;
var mkdirp = require("mkdirp");

const convert = async ({ dir, from, example }) => {
    const out = parseFile(dir, { maxNodeModuleJsDepth: 1 });
    out.body[0].types = out.body[0].types.filter(e => {
        return e.jsDoc;
    });
    const compName = out.body[0].name;
    // console.warn("-- Console ", path.resolve(__dirname, "./template.js"), ); //, JSON.stringify(out));
    // console.warn("-- Console ", prettier.format(JSON.stringify(out), { parser: "json" }));
    // console.warn("-- Console JSON.stringify(out)", JSON.stringify(out));
    let template = fs.readFileSync(path.resolve(__dirname, "./template.js"), "utf8");
    // , er => {
    //     console.warn("-- Console ", er);
    // },"");
    const gend = gs.generate(out);
    template = template.replace("TT_FROM_TT", from);
    template = template.replace("TT_EXAMPLE_TT", example);
    template = template.replace("TT_REPLACE_TT.propTypes = {};", gend);
    template = template.replace(/TT_REPLACE_TT/g, compName);

    // template += gend;
    const prettyComp = prettier.format(template, { parser: "babel" });

    await mkdirp.sync(`${compName}`);
    await fs.writeFileSync(`${compName}/${compName}.js`, prettyComp);
    await fs.writeFileSync(`${compName}/${compName}.less`, `.fk-${compName} { }`);
};

module.exports = convert;
const as = {
    type: "ProgramNode",
    body: [
        {
            type: "ComponentNode",
            name: "Button",
            types: [
                { type: "PropTypeNode", name: "accept", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "acceptCharset", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "action", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "allowFullScreen",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "allowTransparency",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "alt", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "as", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "async",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "autoComplete", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "autoPlay",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "capture",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "StringNode" },
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "cellPadding",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "cellSpacing",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                { type: "PropTypeNode", name: "charSet", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "challenge", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "checked",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "cite", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "classID", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "cols", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "colSpan", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "content", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "controls",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "coords", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "crossOrigin", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "data", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "dateTime", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "default",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "defer",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "disabled",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "download",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "UndefinedNode" }, { type: "AnyNode" }]
                    }
                },
                { type: "PropTypeNode", name: "encType", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "form", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "formAction", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "formEncType", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "formMethod", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "formNoValidate",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "formTarget", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "frameBorder",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                { type: "PropTypeNode", name: "headers", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "height",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                { type: "PropTypeNode", name: "high", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "hrefLang", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "htmlFor", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "httpEquiv", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "integrity", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "keyParams", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "keyType", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "kind", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "label", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "list", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "loop",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "low", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "manifest", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "marginHeight", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "marginWidth", propType: { type: "NumericNode" } },
                {
                    type: "PropTypeNode",
                    name: "max",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                { type: "PropTypeNode", name: "maxLength", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "media", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "mediaGroup", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "method", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "min",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                { type: "PropTypeNode", name: "minLength", propType: { type: "NumericNode" } },
                {
                    type: "PropTypeNode",
                    name: "multiple",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "muted",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "name", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "nonce", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "noValidate",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "open",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "optimum", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "pattern", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "placeholder", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "playsInline",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "poster", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "preload", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "readOnly",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "rel", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "required",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "reversed",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "rows", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "rowSpan", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "sandbox", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "scope", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "scoped",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "scrolling", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "seamless",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "selected",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "shape", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "size", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "sizes", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "span", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "src", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "srcDoc", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "srcLang", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "srcSet", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "start", propType: { type: "NumericNode" } },
                {
                    type: "PropTypeNode",
                    name: "step",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                { type: "PropTypeNode", name: "summary", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "type", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "useMap", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "value",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "StringNode" },
                            { type: "NumericNode" },
                            { type: "ArrayNode", arrayType: { type: "StringNode" } }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "width",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "StringNode" }, { type: "NumericNode" }]
                    }
                },
                { type: "PropTypeNode", name: "wmode", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "wrap", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "defaultChecked",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "defaultValue",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "StringNode" },
                            { type: "ArrayNode", arrayType: { type: "StringNode" } }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "suppressContentEditableWarning",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "suppressHydrationWarning",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "accessKey", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "contentEditable",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "contextMenu", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "dir", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "draggable",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "hidden",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "id", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "lang", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "slot", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "spellCheck",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "style", propType: { type: "ObjectNode" } },
                { type: "PropTypeNode", name: "tabIndex", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "title", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "inputMode", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "is", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "radioGroup", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "role", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "about", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "datatype", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "inlist",
                    propType: {
                        type: "UnionNode",
                        types: [{ type: "UndefinedNode" }, { type: "AnyNode" }]
                    }
                },
                { type: "PropTypeNode", name: "prefix", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "property", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "resource", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "typeof", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "vocab", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "autoCapitalize", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "autoCorrect", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "autoSave", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "color", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "itemProp", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "itemScope",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "itemType", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "itemID", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "itemRef", propType: { type: "StringNode" } },
                { type: "PropTypeNode", name: "results", propType: { type: "NumericNode" } },
                { type: "PropTypeNode", name: "security", propType: { type: "StringNode" } },
                {
                    type: "PropTypeNode",
                    name: "unselectable",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"on"' },
                            { type: "LiteralNode", value: '"off"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-activedescendant",
                    jsDoc:
                        "Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-atomic",
                    jsDoc:
                        "Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-autocomplete",
                    jsDoc:
                        "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be\npresented if they are made.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"list"' },
                            { type: "LiteralNode", value: '"none"' },
                            { type: "LiteralNode", value: '"inline"' },
                            { type: "LiteralNode", value: '"both"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-busy",
                    jsDoc:
                        "Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-checked",
                    jsDoc:
                        'Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.\n@see\n@see',
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' },
                            { type: "LiteralNode", value: '"mixed"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-colcount",
                    jsDoc:
                        "Defines the total number of columns in a table, grid, or treegrid.\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-colindex",
                    jsDoc:
                        "Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.\n@see\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-colspan",
                    jsDoc:
                        "Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.\n@see\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-controls",
                    jsDoc:
                        "Identifies the element (or elements) whose contents or presence are controlled by the current element.\n@see",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-current",
                    jsDoc:
                        "Indicates the element that represents the current item within a container or set of related elements.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"step"' },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' },
                            { type: "LiteralNode", value: '"page"' },
                            { type: "LiteralNode", value: '"location"' },
                            { type: "LiteralNode", value: '"date"' },
                            { type: "LiteralNode", value: '"time"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-describedby",
                    jsDoc: "Identifies the element (or elements) that describes the object.\n@see",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-details",
                    jsDoc:
                        "Identifies the element that provides a detailed, extended description for the object.\n@see",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-disabled",
                    jsDoc:
                        "Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.\n@see\n@see",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-dropeffect",
                    jsDoc:
                        "Indicates what functions can be performed when a dragged object is released on the drop target.\n@deprecated",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"none"' },
                            { type: "LiteralNode", value: '"copy"' },
                            { type: "LiteralNode", value: '"execute"' },
                            { type: "LiteralNode", value: '"link"' },
                            { type: "LiteralNode", value: '"move"' },
                            { type: "LiteralNode", value: '"popup"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-errormessage",
                    jsDoc:
                        "Identifies the element that provides an error message for the object.\n@see\n@see",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-expanded",
                    jsDoc:
                        "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-flowto",
                    jsDoc:
                        "Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,\nallows assistive technology to override the general default of reading in document source order.",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-grabbed",
                    jsDoc:
                        'Indicates an element\'s "grabbed" state in a drag-and-drop operation.\n@deprecated',
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-haspopup",
                    jsDoc:
                        "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' },
                            { type: "LiteralNode", value: '"menu"' },
                            { type: "LiteralNode", value: '"listbox"' },
                            { type: "LiteralNode", value: '"tree"' },
                            { type: "LiteralNode", value: '"grid"' },
                            { type: "LiteralNode", value: '"dialog"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-hidden",
                    jsDoc:
                        "Indicates whether the element is exposed to an accessibility API.\n@see",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-invalid",
                    jsDoc:
                        "Indicates the entered value does not conform to the format expected by the application.\n@see",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' },
                            { type: "LiteralNode", value: '"grammar"' },
                            { type: "LiteralNode", value: '"spelling"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-keyshortcuts",
                    jsDoc:
                        "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-label",
                    jsDoc: "Defines a string value that labels the current element.\n@see",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-labelledby",
                    jsDoc:
                        "Identifies the element (or elements) that labels the current element.\n@see",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-level",
                    jsDoc: "Defines the hierarchical level of an element within a structure.",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-live",
                    jsDoc:
                        "Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"off"' },
                            { type: "LiteralNode", value: '"assertive"' },
                            { type: "LiteralNode", value: '"polite"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-modal",
                    jsDoc: "Indicates whether an element is modal when displayed.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-multiline",
                    jsDoc:
                        "Indicates whether a text box accepts multiple lines of input or only a single line.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-multiselectable",
                    jsDoc:
                        "Indicates that the user may select more than one item from the current selectable descendants.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-orientation",
                    jsDoc:
                        "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"horizontal"' },
                            { type: "LiteralNode", value: '"vertical"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-owns",
                    jsDoc:
                        "Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship\nbetween DOM elements where the DOM hierarchy cannot be used to represent the relationship.\n@see",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-placeholder",
                    jsDoc:
                        "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.\nA hint could be a sample value or a brief description of the expected format.",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-posinset",
                    jsDoc:
                        "Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-pressed",
                    jsDoc: 'Indicates the current "pressed" state of toggle buttons.\n@see\n@see',
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' },
                            { type: "LiteralNode", value: '"mixed"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-readonly",
                    jsDoc:
                        "Indicates that the element is not editable, but is otherwise operable.\n@see",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-relevant",
                    jsDoc:
                        "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.\n@see",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"additions"' },
                            { type: "LiteralNode", value: '"additions text"' },
                            { type: "LiteralNode", value: '"all"' },
                            { type: "LiteralNode", value: '"removals"' },
                            { type: "LiteralNode", value: '"text"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-required",
                    jsDoc:
                        "Indicates that user input is required on the element before a form may be submitted.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-roledescription",
                    jsDoc:
                        "Defines a human-readable, author-localized description for the role of an element.",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-rowcount",
                    jsDoc: "Defines the total number of rows in a table, grid, or treegrid.\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-rowindex",
                    jsDoc:
                        "Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.\n@see\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-rowspan",
                    jsDoc:
                        "Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.\n@see\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-selected",
                    jsDoc: 'Indicates the current "selected" state of various widgets.\n@see\n@see',
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            { type: "LiteralNode", value: '"false"' },
                            { type: "LiteralNode", value: '"true"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-setsize",
                    jsDoc:
                        "Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-sort",
                    jsDoc:
                        "Indicates if items in a table or grid are sorted in ascending or descending order.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"none"' },
                            { type: "LiteralNode", value: '"ascending"' },
                            { type: "LiteralNode", value: '"descending"' },
                            { type: "LiteralNode", value: '"other"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-valuemax",
                    jsDoc: "Defines the maximum allowed value for a range widget.",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-valuemin",
                    jsDoc: "Defines the minimum allowed value for a range widget.",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-valuenow",
                    jsDoc: "Defines the current value for a range widget.\n@see",
                    propType: { type: "NumericNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "aria-valuetext",
                    jsDoc:
                        "Defines the human readable text alternative of aria-valuenow for a range widget.",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "dangerouslySetInnerHTML",
                    propType: {
                        type: "InterfaceNode",
                        types: [
                            {
                                type: "PropTypeNode",
                                name: "__html",
                                propType: { type: "StringNode" }
                            }
                        ]
                    }
                },
                { type: "PropTypeNode", name: "onCopy", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onCopyCapture", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onCut", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onCutCapture", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onPaste", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPasteCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCompositionEnd",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCompositionEndCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCompositionStart",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCompositionStartCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCompositionUpdate",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCompositionUpdateCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onFocusCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onBlurCapture", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onChange", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onChangeCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onBeforeInput", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onBeforeInputCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onInput", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onInputCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onReset", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onResetCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onSubmit", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onSubmitCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onInvalid", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onInvalidCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onLoad", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onLoadCapture", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onError", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onErrorCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onKeyDown", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onKeyDownCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onKeyPress", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onKeyPressCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onKeyUp", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onKeyUpCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onAbort", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onAbortCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onCanPlay", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onCanPlayCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCanPlayThrough",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onCanPlayThroughCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onDurationChange",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onDurationChangeCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onEmptied", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onEmptiedCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onEncrypted", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onEncryptedCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onEnded", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onEndedCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onLoadedData", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onLoadedDataCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onLoadedMetadata",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onLoadedMetadataCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onLoadStart", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onLoadStartCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onPause", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPauseCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onPlay", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onPlayCapture", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onPlaying", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPlayingCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onProgress", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onProgressCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onRateChange", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onRateChangeCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onSeeked", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onSeekedCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onSeeking", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onSeekingCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onStalled", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onStalledCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onSuspend", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onSuspendCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onTimeUpdate", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onTimeUpdateCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onVolumeChange",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onVolumeChangeCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onWaiting", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onWaitingCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onAuxClick", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onAuxClickCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onClickCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onContextMenu", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onContextMenuCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDoubleClick", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onDoubleClickCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDrag", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onDragCapture", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onDragEnd", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onDragEndCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDragEnter", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onDragEnterCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDragExit", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onDragExitCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDragLeave", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onDragLeaveCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDragOver", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onDragOverCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDragStart", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onDragStartCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onDrop", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onDropCapture", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onMouseDownCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onMouseMove", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onMouseMoveCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onMouseOut", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onMouseOutCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onMouseOver", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onMouseOverCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onMouseUpCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onSelect", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onSelectCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onTouchCancel", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onTouchCancelCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onTouchEnd", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onTouchEndCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onTouchMove", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onTouchMoveCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onTouchStart", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onTouchStartCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onPointerDown", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPointerDownCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onPointerMove", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPointerMoveCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onPointerUp", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPointerUpCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onPointerCancel",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onPointerCancelCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onPointerEnter",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onPointerEnterCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onPointerLeave",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onPointerLeaveCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onPointerOver", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPointerOverCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onPointerOut", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onPointerOutCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onGotPointerCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onGotPointerCaptureCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onLostPointerCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onLostPointerCaptureCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onScroll", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onScrollCapture",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onWheel", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onWheelCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onAnimationStart",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onAnimationStartCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onAnimationEnd",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onAnimationEndCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onAnimationIteration",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onAnimationIterationCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onTransitionEnd",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onTransitionEndCapture",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "css",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "StringNode" },
                            { type: "NumericNode" },
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" },
                            {
                                type: "InterfaceNode",
                                types: [
                                    {
                                        type: "PropTypeNode",
                                        name: "__emotion_styles",
                                        propType: { type: "AnyNode" }
                                    }
                                ]
                            },
                            {
                                type: "InterfaceNode",
                                types: [
                                    {
                                        type: "PropTypeNode",
                                        name: "name",
                                        propType: { type: "StringNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "styles",
                                        propType: { type: "StringNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "anim",
                                        propType: { type: "NumericNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "toString",
                                        jsDoc: "Returns a string representation of a string.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "charAt",
                                        jsDoc:
                                            "Returns the character at the specified index.\n@param pos The zero-based index of the desired character.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "charCodeAt",
                                        jsDoc:
                                            "Returns the Unicode value of the character at the specified location.\n@param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "concat",
                                        jsDoc:
                                            "Returns a string that contains the concatenation of two or more strings.\n@param strings The strings to append to the end of the string.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "indexOf",
                                        jsDoc:
                                            "Returns the position of the first occurrence of a substring.\n@param searchString The substring to search for in the string\n@param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "lastIndexOf",
                                        jsDoc:
                                            "Returns the last occurrence of a substring in the string.\n@param searchString The substring to search for.\n@param position The index at which to begin searching. If omitted, the search begins at the end of the string.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "localeCompare",
                                        jsDoc:
                                            "Determines whether two strings are equivalent in the current locale.\n@param that String to compare to target string",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "match",
                                        jsDoc:
                                            "Matches a string with a regular expression, and returns an array containing the results of that search.\n@param regexp A variable name or string literal containing the regular expression pattern and flags.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "replace",
                                        jsDoc:
                                            "Replaces text in a string, using a regular expression or search string.\n@param searchValue A string to search for.\n@param replaceValue A string containing the text to replace for every successful match of searchValue in this string.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "search",
                                        jsDoc:
                                            "Finds the first substring match in a regular expression search.\n@param regexp The regular expression pattern and applicable flags.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "slice",
                                        jsDoc:
                                            "Returns a section of a string.\n@param start The index to the beginning of the specified portion of stringObj.\n@param end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.\r\n      * If this value is not specified, the substring continues to the end of stringObj.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "split",
                                        jsDoc:
                                            "Split a string into substrings using the specified separator and return them as an array.\n@param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.\n@param limit A value used to limit the number of elements returned in the array.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "substring",
                                        jsDoc:
                                            "Returns the substring at the specified location within a String object.\n@param start The zero-based index number indicating the beginning of the substring.\n@param end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.\r\n      * If end is omitted, the characters from start through the end of the original string are returned.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "toLowerCase",
                                        jsDoc:
                                            "Converts all the alphabetic characters in a string to lowercase.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "toLocaleLowerCase",
                                        jsDoc:
                                            "Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "toUpperCase",
                                        jsDoc:
                                            "Converts all the alphabetic characters in a string to uppercase.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "toLocaleUpperCase",
                                        jsDoc:
                                            "Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "trim",
                                        jsDoc:
                                            "Removes the leading and trailing white space and line terminator characters from a string.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "length",
                                        jsDoc: "Returns the length of a String object.",
                                        propType: { type: "NumericNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "substr",
                                        jsDoc:
                                            "Gets a substring beginning at the specified location and having the specified length.\n@param from The starting position of the desired substring. The index of the first character in the string is zero.\n@param length The number of characters to include in the returned substring.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "valueOf",
                                        jsDoc:
                                            "Returns the primitive value of the specified object.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "codePointAt",
                                        jsDoc:
                                            "Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point\r\nvalue of the UTF-16 encoded code point starting at the string element at position pos in\r\nthe String resulting from converting this object to a String.\r\nIf there is no element at that position, the result is undefined.\r\nIf a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "includes",
                                        jsDoc:
                                            "Returns true if searchString appears as a substring of the result of converting this\r\nobject to a String, at one or more positions that are\r\ngreater than or equal to position; otherwise, returns false.\n@param searchString search string\n@param position If position is undefined, 0 is assumed, so as to search all of the String.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "endsWith",
                                        jsDoc:
                                            "Returns true if the sequence of elements of searchString converted to a String is the\r\nsame as the corresponding elements of this object (converted to a String) starting at\r\nendPosition – length(this). Otherwise returns false.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "normalize",
                                        jsDoc:
                                            'Returns the String value result of normalizing the string into the normalization form\r\nnamed by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.\n@param form Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default\r\n     * is "NFC"',
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "repeat",
                                        jsDoc:
                                            "Returns a String value that is made from count copies appended together. If count is 0,\r\nthe empty string is returned.\n@param count number of copies to append",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "startsWith",
                                        jsDoc:
                                            "Returns true if the sequence of elements of searchString converted to a String is the\r\nsame as the corresponding elements of this object (converted to a String) starting at\r\nposition. Otherwise returns false.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "anchor",
                                        jsDoc:
                                            "Returns an <a> HTML anchor element and sets the name attribute to the text value\n@param name",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "big",
                                        jsDoc: "Returns a <big> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "blink",
                                        jsDoc: "Returns a <blink> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "bold",
                                        jsDoc: "Returns a <b> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "fixed",
                                        jsDoc: "Returns a <tt> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "fontcolor",
                                        jsDoc:
                                            "Returns a <font> HTML element and sets the color attribute value",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "fontsize",
                                        jsDoc:
                                            "Returns a <font> HTML element and sets the size attribute value",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "italics",
                                        jsDoc: "Returns an <i> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "link",
                                        jsDoc:
                                            "Returns an <a> HTML element and sets the href attribute value",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "small",
                                        jsDoc: "Returns a <small> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "strike",
                                        jsDoc: "Returns a <strike> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "sub",
                                        jsDoc: "Returns a <sub> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "sup",
                                        jsDoc: "Returns a <sup> HTML element",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "__@iterator",
                                        jsDoc: "Iterator",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "padStart",
                                        jsDoc:
                                            'Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\r\nThe padding is applied from the start (left) of the current string.\n@param maxLength The length of the resulting string once the current string has been padded.\r\n     *        If this parameter is smaller than the current string\'s length, the current string will be returned as it is.\r\n     *\n@param fillString The string to pad the current string with.\r\n     *        If this string is too long, it will be truncated and the left-most part will be applied.\r\n     *        The default value for this parameter is " " (U+0020).',
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "padEnd",
                                        jsDoc:
                                            'Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\r\nThe padding is applied from the end (right) of the current string.\n@param maxLength The length of the resulting string once the current string has been padded.\r\n     *        If this parameter is smaller than the current string\'s length, the current string will be returned as it is.\r\n     *\n@param fillString The string to pad the current string with.\r\n     *        If this string is too long, it will be truncated and the left-most part will be applied.\r\n     *        The default value for this parameter is " " (U+0020).',
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "trimLeft",
                                        jsDoc: "Removes whitespace from the left end of a string.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "trimRight",
                                        jsDoc: "Removes whitespace from the right end of a string.",
                                        propType: { type: "FunctionNode" }
                                    }
                                ]
                            },
                            {
                                type: "InterfaceNode",
                                types: [
                                    {
                                        type: "PropTypeNode",
                                        name: "name",
                                        propType: { type: "StringNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "styles",
                                        propType: { type: "StringNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "map",
                                        propType: { type: "StringNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "next",
                                        propType: { type: "ObjectNode" }
                                    }
                                ]
                            },
                            {
                                type: "InterfaceNode",
                                types: [
                                    {
                                        type: "PropTypeNode",
                                        name: "length",
                                        jsDoc:
                                            "Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.",
                                        propType: { type: "NumericNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "toString",
                                        jsDoc: "Returns a string representation of an array.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "toLocaleString",
                                        jsDoc:
                                            "Returns a string representation of an array. The elements are converted to string using their toLocalString methods.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "pop",
                                        jsDoc:
                                            "Removes the last element from an array and returns it.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "push",
                                        jsDoc:
                                            "Appends new elements to an array, and returns the new length of the array.\n@param items New elements of the Array.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "concat",
                                        jsDoc:
                                            "Combines two or more arrays.\n@param items Additional items to add to the end of array1.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "join",
                                        jsDoc:
                                            "Adds all the elements of an array separated by the specified separator string.\n@param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "reverse",
                                        jsDoc: "Reverses the elements in an Array.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "shift",
                                        jsDoc:
                                            "Removes the first element from an array and returns it.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "slice",
                                        jsDoc:
                                            "Returns a section of an array.\n@param start The beginning of the specified portion of the array.\n@param end The end of the specified portion of the array.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "sort",
                                        jsDoc:
                                            "Sorts an array.\n@param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "splice",
                                        jsDoc:
                                            "Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.\n@param start The zero-based location in the array from which to start removing elements.\n@param deleteCount The number of elements to remove.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "unshift",
                                        jsDoc:
                                            "Inserts new elements at the start of an array.\n@param items  Elements to insert at the start of the Array.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "indexOf",
                                        jsDoc:
                                            "Returns the index of the first occurrence of a value in an array.\n@param searchElement The value to locate in the array.\n@param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "lastIndexOf",
                                        jsDoc:
                                            "Returns the index of the last occurrence of a specified value in an array.\n@param searchElement The value to locate in the array.\n@param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "every",
                                        jsDoc:
                                            "Determines whether all the members of an array satisfy the specified test.\n@param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.\n@param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "some",
                                        jsDoc:
                                            "Determines whether the specified callback function returns true for any element of an array.\n@param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.\n@param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "forEach",
                                        jsDoc:
                                            "Performs the specified action for each element in an array.\n@param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.\n@param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "map",
                                        jsDoc:
                                            "Calls a defined callback function on each element of an array, and returns an array that contains the results.\n@param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.\n@param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "filter",
                                        jsDoc:
                                            "Returns the elements of an array that meet the condition specified in a callback function.\n@param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.\n@param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "reduce",
                                        jsDoc:
                                            "Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.\n@param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.\n@param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "reduceRight",
                                        jsDoc:
                                            "Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.\n@param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.\n@param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "find",
                                        jsDoc:
                                            "Returns the value of the first element in the array where predicate is true, and undefined\r\notherwise.\n@param predicate find calls predicate once for each element of the array, in ascending\r\n     * order, until it finds one where predicate returns true. If such an element is found, find\r\n     * immediately returns that element value. Otherwise, find returns undefined.\n@param thisArg If provided, it will be used as the this value for each invocation of\r\n     * predicate. If it is not provided, undefined is used instead.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "findIndex",
                                        jsDoc:
                                            "Returns the index of the first element in the array where predicate is true, and -1\r\notherwise.\n@param predicate find calls predicate once for each element of the array, in ascending\r\n     * order, until it finds one where predicate returns true. If such an element is found,\r\n     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.\n@param thisArg If provided, it will be used as the this value for each invocation of\r\n     * predicate. If it is not provided, undefined is used instead.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "fill",
                                        jsDoc:
                                            "Returns the this object after filling the section identified by start and end with value\n@param value value to fill array section with\n@param start index to start filling the array at. If start is negative, it is treated as\r\n     * length+start where length is the length of the array.\n@param end index to stop filling the array at. If end is negative, it is treated as\r\n     * length+end.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "copyWithin",
                                        jsDoc:
                                            "Returns the this object after copying a section of the array identified by start and end\r\nto the same array starting at position target\n@param target If target is negative, it is treated as length+target where length is the\r\n     * length of the array.\n@param start If start is negative, it is treated as length+start. If end is negative, it\r\n     * is treated as length+end.\n@param end If not specified, length of the this object is used as its default value.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "__@iterator",
                                        jsDoc: "Iterator",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "entries",
                                        jsDoc:
                                            "Returns an iterable of key, value pairs for every entry in the array",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "keys",
                                        jsDoc: "Returns an iterable of keys in the array",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "values",
                                        jsDoc: "Returns an iterable of values in the array",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "__@unscopables",
                                        jsDoc:
                                            "Returns an object whose properties have the value 'true'\r\nwhen they will be absent when used in a 'with' statement.",
                                        propType: { type: "FunctionNode" }
                                    },
                                    {
                                        type: "PropTypeNode",
                                        name: "includes",
                                        jsDoc:
                                            "Determines whether an array includes a certain element, returning true or false as appropriate.\n@param searchElement The element to search for.\n@param fromIndex The position in this array at which to begin searching for searchElement.",
                                        propType: { type: "FunctionNode" }
                                    }
                                ]
                            },
                            { type: "ObjectNode" },
                            { type: "FunctionNode" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "appearance",
                    jsDoc: "The base styling to apply to the button",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"default"' },
                            { type: "LiteralNode", value: '"link"' },
                            { type: "LiteralNode", value: '"danger"' },
                            { type: "LiteralNode", value: '"primary"' },
                            { type: "LiteralNode", value: '"subtle"' },
                            { type: "LiteralNode", value: '"subtle-link"' },
                            { type: "LiteralNode", value: '"warning"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "autoFocus",
                    jsDoc: "Set the button to autofocus on mount",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "className",
                    jsDoc: "Add a classname to the button",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "component",
                    jsDoc: "A custom component to use instead of the default button",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "UndefinedNode" },
                            { type: "ElementNode", elementType: "elementType" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "consumerRef",
                    jsDoc: "Internal use only. Please use `ref` to forward refs",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "FunctionNode" },
                            {
                                type: "InterfaceNode",
                                types: [
                                    {
                                        type: "PropTypeNode",
                                        name: "current",
                                        propType: { type: "ObjectNode" }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "href",
                    jsDoc: "Provides a url for buttons being used as a link",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "iconAfter",
                    jsDoc: "Places an icon within the button, after the button's text",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "StringNode" },
                            { type: "NumericNode" },
                            { type: "ElementNode", elementType: "element" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "iconBefore",
                    jsDoc: "Places an icon within the button, before the button's text",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "StringNode" },
                            { type: "NumericNode" },
                            { type: "ElementNode", elementType: "element" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "isDisabled",
                    jsDoc: "Set if the button is disabled",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "isLoading",
                    jsDoc:
                        "Set if the button is loading. When isLoading is true, text is hidden, and\na spinner is shown in its place. The button maintains the width that it\nwould have if the text were visible.",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "isSelected",
                    jsDoc: "Change the style to indicate the button is selected",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "onBlur",
                    jsDoc: "Handler to be called on blur",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "onClick",
                    jsDoc:
                        "Handler to be called on click. The second argument can be used to track analytics data. See the tutorial in the analytics-next package for details",
                    propType: { type: "FunctionNode" }
                },
                { type: "PropTypeNode", name: "onMouseDown", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onMouseEnter", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onMouseLeave", propType: { type: "FunctionNode" } },
                { type: "PropTypeNode", name: "onMouseUp", propType: { type: "FunctionNode" } },
                {
                    type: "PropTypeNode",
                    name: "onFocus",
                    jsDoc: "Handler to be called on focus",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "spacing",
                    jsDoc: "Set the amount of padding in the button",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: '"default"' },
                            { type: "LiteralNode", value: '"none"' },
                            { type: "LiteralNode", value: '"compact"' }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "target",
                    jsDoc:
                        "Pass target down to a link within the button component, if a href is provided",
                    propType: { type: "StringNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "shouldFitContainer",
                    jsDoc: "Option to fit button width to its parent width",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "LiteralNode", value: "false" },
                            { type: "LiteralNode", value: "true" }
                        ]
                    }
                },
                {
                    type: "PropTypeNode",
                    name: "theme",
                    jsDoc: "Pass in a custom theme",
                    propType: { type: "FunctionNode" }
                },
                {
                    type: "PropTypeNode",
                    name: "children",
                    propType: {
                        type: "UnionNode",
                        types: [
                            { type: "ElementNode", elementType: "node" },
                            { type: "UndefinedNode" }
                        ]
                    }
                }
            ]
        }
    ]
};
