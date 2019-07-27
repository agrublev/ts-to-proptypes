"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'ArrayNode';
function arrayNode(arrayType) {
    return {
        type: typeString,
        arrayType,
    };
}
exports.arrayNode = arrayNode;
function isArrayNode(node) {
    return node.type === typeString;
}
exports.isArrayNode = isArrayNode;
//# sourceMappingURL=array.js.map