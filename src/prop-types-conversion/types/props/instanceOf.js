"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeString = 'InstanceOfNode';
function instanceOfNode(instance) {
    return {
        type: typeString,
        instance,
    };
}
exports.instanceOfNode = instanceOfNode;
function isInstanceOfNode(node) {
    return node.type === typeString;
}
exports.isInstanceOfNode = isInstanceOfNode;
//# sourceMappingURL=instanceOf.js.map