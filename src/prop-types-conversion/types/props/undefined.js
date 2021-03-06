"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'UndefinedNode';
function undefinedNode() {
    return {
        type: typeString,
    };
}
exports.undefinedNode = undefinedNode;
function isUndefinedNode(node) {
    return node.type === typeString;
}
exports.isUndefinedNode = isUndefinedNode;
//# sourceMappingURL=undefined.js.map