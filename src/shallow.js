import isPlainObject from 'lodash.isplainobject';
import omitBy from 'lodash.omitby';
import entries from 'object.entries';
import {propsOfNode} from 'enzyme/build/Utils';
import {typeName} from 'enzyme/build/Debug';
import {childrenOfNode} from 'enzyme/build/ShallowTraversal';
import {isElement} from 'enzyme/build/react-compat';
import {compact} from './utils';

function nodeToJson(node, options) {
  if (!node) {
    return node;
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return node;
  }

  if (!isElement(node)) {
    if (Array.isArray(node)) {
      return node.map(nodeToJson);
    }

    if (isPlainObject(node)) {
      return entries(node).reduce((obj, [key, val]) => {
        obj[key] = nodeToJson(val, options);
        return obj;
      }, {});
    } else if (node._reactInternalInstance) {
      return nodeToJson(node._reactInternalInstance._currentElement, options);
    }

    return node;
  }

  const children = compact(
    childrenOfNode(node).map(n => nodeToJson(n, options)),
  );
  const type = typeName(node);

  const props = omitBy(
    Object.assign({}, propsOfNode(node), {
      key: options.noKey !== true && node.key ? node.key : undefined,
    }),
    (val, key) => key === 'children' || val === undefined,
  );

  return {
    type,
    props: nodeToJson(props, options),
    children: children.length ? children : null,
    $$typeof: Symbol.for('react.test.json'),
  };
}

export default (wrapper, options = {}) => {
  if (wrapper.length > 1) {
    const nodes = wrapper.getNodes ? wrapper.getNodes() : wrapper.nodes;
    return nodes.map(node => nodeToJson(node, options));
  }

  const node = wrapper.getNode ? wrapper.getNode() : wrapper.node;
  return nodeToJson(node, options);
};
