import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';

import {typeName} from 'enzyme/build/Debug';
import {childrenOfNode, propsOfNode} from 'enzyme/build/RSTTraversal';

import {compact} from './utils';

function nodeToJson(node, options) {
  if (typeof node === 'string' || typeof node === 'number') {
    return node;
  }

  if (!node) {
    return '';
  }

  if (Array.isArray(node)) {
    return node.map(n => nodeToJson(n, options));
  }

  const children = compact(
    childrenOfNode(node).map(n => nodeToJson(n, options)),
  );

  const type = typeName(node);
  const props = omitBy(
    Object.assign({}, propsOfNode(node)),
    (val, key) => key === 'children' || val === undefined,
  );

  if (!isNil(node.key) && options.noKey !== true) {
    props.key = node.key;
  }

  return {
    type,
    props,
    children: children.length > 0 ? children : null,
    $$typeof: Symbol.for('react.test.json'),
  };
}

const shallowToJson = (wrapper, options = {}) => {
  if (wrapper.length > 1) {
    const nodes = wrapper.getNodesInternal();
    return nodes.map(node => nodeToJson(node, options));
  }

  const node = wrapper.getNodeInternal();
  return nodeToJson(node, options);
};

export default shallowToJson;
