"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'InterfaceNode';
function interfaceNode(types) {
    return {
        type: typeString,
        types: types || [],
    };
}
exports.interfaceNode = interfaceNode;
function isInterfaceNode(node) {
    return node.type === typeString;
}
exports.isInterfaceNode = isInterfaceNode;
//# sourceMappingURL=interface.js.map