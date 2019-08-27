/* eslint-env jest */

// import React from 'react';
import React, {memo, lazy, Suspense} from 'react';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {isEnzymeWrapper, extractTypeName} from '../src/utils';

Enzyme.configure({adapter: new Adapter()});

const Lazy = lazy(() => Promise.resolve(<div>lazy div</div>));
const Memo = memo(() => <div>memoized div</div>);

it('returns true whenever it is an enzyme wrapper', () => {
  expect(isEnzymeWrapper(shallow(<div />))).toBe(true);
  expect(isEnzymeWrapper(mount(<div />))).toBe(true);
  expect(isEnzymeWrapper(render(<div />))).toBe(true);
});

it('returns false whenever it is an enzyme wrapper', () => {
  expect(isEnzymeWrapper(1)).toBe(false);
  expect(isEnzymeWrapper('test')).toBe(false);
  expect(isEnzymeWrapper(<div />)).toBe(false);
});

it('returns correct node type', () => {
  expect(extractTypeName(<Lazy />)).toBe('React.Lazy');
  expect(extractTypeName(<Memo />)).toBe('React.Memo');
  expect(extractTypeName(<Suspense />)).toBe('React.Suspense');
})
