"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'PropTypeNode';
function propTypeNode(name, jsDoc, propType) {
    return {
        type: typeString,
        name,
        jsDoc,
        propType,
    };
}
exports.propTypeNode = propTypeNode;
function isPropTypeNode(node) {
    return node.type === typeString;
}
exports.isPropTypeNode = isPropTypeNode;
//# sourceMappingURL=proptype.js.map