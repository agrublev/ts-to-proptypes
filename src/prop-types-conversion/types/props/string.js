"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'StringNode';
function stringNode() {
    return {
        type: typeString,
    };
}
exports.stringNode = stringNode;
function isStringNode(node) {
    return node.type === typeString;
}
exports.isStringNode = isStringNode;
//# sourceMappingURL=string.js.map