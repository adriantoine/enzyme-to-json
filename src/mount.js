import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';
import values from 'object-values';
import {isDOMComponent, isElement} from 'enzyme/build/react-compat';
import {internalInstance, propsOfNode} from 'enzyme/build/Utils';
import {typeName} from 'enzyme/build/Debug';
import {childrenOfNode} from 'enzyme/build/ShallowTraversal';
import {
  includeInChildrenCompatible,
  includeInChildrenMinimal,
  omitFromPropsCompatible,
  omitFromPropsMinimal,
} from './utils';

function instToJson(inst, options) {
  if (typeof inst === 'string' || typeof inst === 'number') {
    return inst;
  }
  if (!inst) {
    return null;
  }

  if (inst._stringText || (options && typeof inst._stringText === 'string')) {
    return inst._stringText;
  }

  if (!inst.getPublicInstance) {
    const internal = internalInstance(inst);
    return instToJson(internal, options);
  }
  const publicInst = inst.getPublicInstance();

  if (typeof publicInst === 'string' || typeof publicInst === 'number') {
    return publicInst;
  }
  if (!publicInst && !inst._renderedComponent) {
    return null;
  }

  const currentElement = inst._currentElement;
  const type = typeName(currentElement);
  const props = omitBy(
    propsOfNode(currentElement),
    options ? omitFromPropsCompatible : omitFromPropsMinimal,
  );
  const children = [];
  if (isDOMComponent(publicInst)) {
    const renderedChildren = inst._renderedChildren;
    if (isNil(renderedChildren)) {
      children.push(...childrenOfNode(currentElement));
    } else {
      children.push(...values(renderedChildren));
    }
  } else if (
    isElement(currentElement) &&
    typeof currentElement.type === 'function'
  ) {
    if (!options) {
      children.push(inst._renderedComponent);
    } else if (options.toDeep) {
      // A component returns at most one element in React 15 and earlier.
      return instToJson(inst._renderedComponent, options);
    }
    // else if shallow, children are still an empty array
  }

  const childrenArray = children
    .map(n => instToJson(n, options))
    .filter(options ? includeInChildrenCompatible : includeInChildrenMinimal);

  return {
    type,
    props,
    children: childrenArray.length ? childrenArray : null,
    $$typeof: Symbol.for('react.test.json'),
  };
}

const wrapperToJson = (wrapper, options) =>
  wrapper.length > 1
    ? wrapper.nodes.map(node => instToJson(node, options))
    : instToJson(wrapper.node, options);

const mountToDeepJson = wrapper =>
  wrapperToJson(wrapper, {
    toDeep: true,
  });

const mountToShallowJson = wrapper =>
  wrapperToJson(wrapper, {
    toDeep: false,
  });

export {mountToDeepJson, mountToShallowJson};

export default wrapper => wrapperToJson(wrapper);
