"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'ElementNode';
function elementNode(elementType) {
    return {
        type: typeString,
        elementType,
    };
}
exports.elementNode = elementNode;
function isElementNode(node) {
    return node.type === typeString;
}
exports.isElementNode = isElementNode;
//# sourceMappingURL=element.js.map