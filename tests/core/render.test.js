/* eslint-env jest */

import React from 'react';
import Enzyme, {render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderToJson from '../../src/render';
import {BasicPure, BasicWithAList} from './fixtures/pure-function';
import {BasicClass, ClassWithNull} from './fixtures/class';

Enzyme.configure({adapter: new Adapter()});

it('converts basic pure render', () => {
  const rendered = render(
    <BasicPure className="pure">
      <strong>Hello!</strong>
    </BasicPure>,
  );

  expect(renderToJson(rendered)).toMatchSnapshot();
});

it('converts basic class render', () => {
  const rendered = render(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(renderToJson(rendered)).toMatchSnapshot();
});

it('renders the whole list', () => {
  const wrapper = render(<BasicWithAList />);
  expect(renderToJson(wrapper.find('ul'))).toMatchSnapshot();
});

it('handles a component which returns null', () => {
  const rendered = render(<ClassWithNull />);

  expect(renderToJson(rendered)).toMatchSnapshot();
});

it('renders multiple elements as a result of find', () => {
  const rendered = render(<BasicWithAList />);
  expect(renderToJson(rendered.find('li'))).toMatchSnapshot();
});
