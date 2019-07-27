"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'BooleanNode';
function booleanNode() {
    return {
        type: typeString,
    };
}
exports.booleanNode = booleanNode;
function isBooleanNode(node) {
    return node.type === typeString;
}
exports.isBooleanNode = isBooleanNode;
//# sourceMappingURL=boolean.js.map