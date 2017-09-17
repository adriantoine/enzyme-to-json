/* eslint-env jest */

import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {isEnzymeWrapper} from '../../src/utils';

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
