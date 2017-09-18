import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';

import {typeName} from 'enzyme/build/Debug';
import {childrenOfNode, propsOfNode} from 'enzyme/build/RSTTraversal';

import {compact} from './utils';

function getChildren(node, options) {
  if (options.mode === 'shallow' && typeof node.type === 'function') {
    return null;
  }

  const children = compact(
    childrenOfNode(node).map(n => internalNodeToJson(n, options)),
  );

  return children.length > 0 ? children : null;
}

function getProps(node, options) {
  const props = omitBy(
    {
      ...propsOfNode(node),
    },
    (val, key) => key === 'children',
  );

  if (!isNil(node.key) && options.noKey !== true) {
    props.key = node.key;
  }

  return props;
}

function internalNodeToJson(node, options) {
  if (typeof node === 'string' || typeof node === 'number') {
    return node;
  }

  if (isNil(node)) {
    return '';
  }

  if (options.mode === 'deep' && typeof node.type === 'function') {
    return internalNodeToJson(node.rendered, options);
  }

  return {
    type: typeName(node),
    props: getProps(node, options),
    children: getChildren(node, options),
    $$typeof: Symbol.for('react.test.json'),
  };
}

const mountToJson = (wrapper, options = {}) => {
  if (isNil(wrapper) || wrapper.length === 0) {
    return null;
  }

  if (wrapper.length > 1) {
    const nodes = wrapper.getNodesInternal();
    return nodes.map(node => internalNodeToJson(node, options));
  }

  const node = wrapper.getNodeInternal();
  return internalNodeToJson(node, options);
};

export default mountToJson;
