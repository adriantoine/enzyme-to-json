import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import {typeName} from 'enzyme/build/Debug';
import {childrenOfNode, propsOfNode} from 'enzyme/build/RSTTraversal';

import {compact, applyMap} from './utils';

function getChildren(node, options) {
  const children = compact(
    childrenOfNode(node).map(n => internalNodeToJson(n, options)),
  );

  if (children.length > 0) {
    return children;
  }

  return null;
}

function getProps(node, options) {
  const props = omitBy(
    Object.assign({}, propsOfNode(node)),
    (val, key) => key === 'children' || val === undefined,
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

  if (isNil(node) || node === false) {
    return '';
  }

  if (Array.isArray(node)) {
    return node.map(n => internalNodeToJson(n, options));
  }

  const json = applyMap(
    {
      node,
      type: typeName(node),
      props: getProps(node, options),
      children: getChildren(node, options),
      $$typeof: Symbol.for('react.test.json'),
    },
    options,
  );

  if (!isNil(json) && !isNil(json.type)) {
    return json;
  }
}

const shallowToJson = (wrapper, options = {}) => {
  if (isNil(wrapper) || wrapper.length === 0) {
    return null;
  }

  if (wrapper.length > 1 && typeof wrapper.getNodesInternal === 'function') {
    const nodes = wrapper.getNodesInternal();
    return nodes.map(node => internalNodeToJson(node, options));
  }

  if (typeof wrapper.getNodeInternal === 'function') {
    const node = wrapper.getNodeInternal();
    return internalNodeToJson(node, options);
  }

  return null;
};

export default shallowToJson;
