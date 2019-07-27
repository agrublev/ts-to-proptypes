"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'AnyNode';
function anyNode() {
    return {
        type: typeString,
    };
}
exports.anyNode = anyNode;
function isAnyNode(node) {
    return node.type === typeString;
}
exports.isAnyNode = isAnyNode;
//# sourceMappingURL=any.js.map