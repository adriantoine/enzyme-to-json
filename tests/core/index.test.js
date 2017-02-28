/* eslint-env jest */

jest.mock('../../src/shallow');
jest.mock('../../src/mount');
jest.mock('../../src/render');

import React from 'react';
import {shallow, mount, render} from 'enzyme';

import shallowToJson from '../../src/shallow';
import mountToJson from '../../src/mount';
import renderToJson from '../../src/render';

import toJson from '../../src';

it('runs shallowToJson when a shallow wrapper is passed', () => {
  const shallowed = shallow(<div>test</div>);
  const options = {};
  toJson(shallowed, options);

  expect(shallowToJson).toHaveBeenCalledTimes(1);
  expect(shallowToJson).toHaveBeenCalledWith(shallowed, options);
});

it('runs mountToJson when a mount wrapper is passed', () => {
  const mounted = mount(<div>test</div>);
  toJson(mounted);

  expect(mountToJson).toHaveBeenCalledTimes(1);
  expect(mountToJson).toHaveBeenCalledWith(mounted);
});

it('runs renderToJson when a render wrapper is passed', () => {
  const rendered = render(<div>test</div>);
  toJson(rendered);

  expect(renderToJson).toHaveBeenCalledTimes(1);
  expect(renderToJson).toHaveBeenCalledWith(rendered);
});
