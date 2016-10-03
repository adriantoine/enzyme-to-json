import compact from 'lodash.compact';
import omit from 'lodash.omit';
import {propsOfNode} from 'enzyme/build/Utils';
import {typeName} from 'enzyme/build/Debug';
import {childrenOfNode} from 'enzyme/build/ShallowTraversal';

function nodeToJson(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return node;
    }

    const children = compact(childrenOfNode(node).map(n => nodeToJson(n)));
    const type = typeName(node);
    const props = omit(propsOfNode(node), 'children');

    return {
        type,
        props,
        children: children.length ? children : null,
        $$typeof: Symbol.for('react.test.json'),
    };
}

export function shallowToJson(wrapper) {
    return nodeToJson(wrapper.node);
}
