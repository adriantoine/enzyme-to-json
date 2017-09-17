/* eslint-env jest */
/* eslint import/first:0 */

jest.mock('../../src/shallow');
jest.mock('../../src/mount');
jest.mock('../../src/render');

import React from 'react';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import shallowToJson from '../../src/shallow';
import mountToJson from '../../src/mount';
import renderToJson from '../../src/render';

import toJson from '../../src';

Enzyme.configure({adapter: new Adapter()});

it('runs shallowToJson when a shallow wrapper is passed', () => {
  const shallowed = shallow(<div>test</div>);
  toJson(shallowed, {noKey: true});

  expect(shallowToJson).toHaveBeenCalledTimes(1);
  expect(shallowToJson).toHaveBeenCalledWith(shallowed, {noKey: true});
});

it('runs mountToJson when a mount wrapper is passed', () => {
  const mounted = mount(<div>test</div>);
  toJson(mounted, {noKey: true});

  expect(mountToJson).toHaveBeenCalledTimes(1);
  expect(mountToJson).toHaveBeenCalledWith(mounted, {noKey: true});
});

it('runs renderToJson when a render wrapper is passed', () => {
  const rendered = render(<div>test</div>);
  toJson(rendered, {noKey: true});

  expect(renderToJson).toHaveBeenCalledTimes(1);
  expect(renderToJson).toHaveBeenCalledWith(rendered, {noKey: true});
});
