import filter from 'lodash/filter';
import isNil from 'lodash/isNil';
import ShallowWrapper from 'enzyme/build/ShallowWrapper';
import ReactWrapper from 'enzyme/build/ReactWrapper';
import {typeName} from 'enzyme/build/Debug';

const SHALLOW_WRAPPER_NAME = ShallowWrapper.name;
const REACT_WRAPPER_NAME = ReactWrapper.name;

export const isShallowWrapper = wrapper =>
  !isNil(wrapper) &&
  !isNil(wrapper.constructor) &&
  wrapper.constructor.name === SHALLOW_WRAPPER_NAME;

export const isReactWrapper = wrapper =>
  !isNil(wrapper) &&
  !isNil(wrapper.constructor) &&
  wrapper.constructor.name === REACT_WRAPPER_NAME;

export const isCheerioWrapper = wrapper =>
  !isNil(wrapper) && !isNil(wrapper.cheerio);

export const isEnzymeWrapper = wrapper =>
  isShallowWrapper(wrapper) ||
  isReactWrapper(wrapper) ||
  isCheerioWrapper(wrapper);

export const compact = array =>
  filter(array, item => !isNil(item) && item !== '');

export const applyMap = (json, options) => {
  if (typeof options.map === 'function') {
    return options.map(json);
  }
  return json;
};

export const extractTypeName = node => {
  const name = typeName(node);

  if (name.$$typeof === Symbol.for('react.lazy')) {
    return 'React.Lazy';
  }

  if (name.$$typeof === Symbol.for('react.memo')) {
    return 'React.Memo';
  }

  if (name === Symbol.for('react.suspense')) {
    return 'React.Suspense';
  }

  return name;
};
