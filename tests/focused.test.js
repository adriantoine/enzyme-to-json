/* eslint-env jest */

import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from '../../src';

Enzyme.configure({adapter: new Adapter()});

const MyComponent = props => (
  <div className={`my-component ${props.className}`}>
    <h3>Component Title</h3>
    <span>{props.children}</span>
  </div>
);

it('renders the right title', () => {
  const wrapper = shallow(<MyComponent className="strong-class" />);

  expect(shallowToJson(wrapper.find('h3'))).toMatchSnapshot();
});

it('renders a `strong` correctly', () => {
  const wrapper = shallow(
    <MyComponent className="strong-class">
      <strong>Hello World!</strong>
    </MyComponent>,
  );

  expect(shallowToJson(wrapper.find('span').first())).toMatchSnapshot();
});

it('renders a `span` correctly', () => {
  const wrapper = shallow(
    <MyComponent className="span-class">
      <span>Hello World!</span>
    </MyComponent>,
  );

  expect(shallowToJson(wrapper.find('span').first())).toMatchSnapshot();
});
