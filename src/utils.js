import filter from 'lodash.filter';
import isNil from 'lodash.isnil';
import ShallowWrapper from 'enzyme/build/ShallowWrapper';
import ReactWrapper from 'enzyme/build/ReactWrapper';

const SHALLOW_WRAPPER_NAME = ShallowWrapper.name;
const REACT_WRAPPER_NAME = ReactWrapper.name;

export const isShallowWrapper = wrapper =>
  wrapper &&
  wrapper.constructor &&
  wrapper.constructor.name === SHALLOW_WRAPPER_NAME;
export const isReactWrapper = wrapper =>
  wrapper &&
  wrapper.constructor &&
  wrapper.constructor.name === REACT_WRAPPER_NAME;
export const isCheerioWrapper = wrapper => wrapper && wrapper.cheerio;

export const isEnzymeWrapper = wrapper =>
  isShallowWrapper(wrapper) ||
  isReactWrapper(wrapper) ||
  isCheerioWrapper(wrapper);

export const omitFromPropsMinimal = (val, key) =>
  key === 'children' || val === undefined;
export const includeInChildrenMinimal = item => !isNil(item) && item !== '';

// For mountToDeepJson and mountToShallowJson
// to return test objects which are compatible with react-test-renderer
export const omitFromPropsCompatible = (val, key) => key === 'children';
export const includeInChildrenCompatible = item => !isNil(item);

export const compact = array => filter(array, includeInChildrenMinimal);
