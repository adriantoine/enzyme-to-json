import ShallowWrapper from 'enzyme/build/ShallowWrapper';
import ReactWrapper from 'enzyme/build/ReactWrapper';

const SHALLOW_WRAPPER_NAME = ShallowWrapper.name;
const REACT_WRAPPER_NAME = ReactWrapper.name;

export const isShallowWrapper = wrapper => wrapper && wrapper.constructor && wrapper.constructor.name === SHALLOW_WRAPPER_NAME;
export const isReactWrapper = wrapper => wrapper && wrapper.constructor && wrapper.constructor.name === REACT_WRAPPER_NAME;
export const isCheerioWrapper = wrapper => wrapper.cheerio;

export const isEnzymeWrapper = wrapper => isShallowWrapper(wrapper) || isReactWrapper(wrapper) || isCheerioWrapper(wrapper);
