/* eslint-env jest */

import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import shallowToJson from '../../src/shallow';
import {
  BasicPure,
  BasicWithUndefined,
  BasicWithAList,
  ArrayRender,
} from './fixtures/pure-function';
import {
  BasicClass,
  ClassWithPure,
  ClassWithNull,
  ClassArrayRender,
} from './fixtures/class';

Enzyme.configure({adapter: new Adapter()});

function WrapperComponent(props) {
  return <BasicPure {...props} />;
}

it('doesnt break when called without arguments', () => {
  expect(shallowToJson()).toBe(null);
});

it('converts basic pure shallow', () => {
  const shallowed = shallow(
    <BasicPure className="pure">
      <strong>Hello!</strong>
    </BasicPure>,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('converts basic class shallow', () => {
  const shallowed = shallow(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('converts a class mount with a pure function in it', () => {
  const shallowed = shallow(
    <ClassWithPure className="class">
      <strong>Hello!</strong>
    </ClassWithPure>,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('handles a component which returns null', () => {
  const shallowed = shallow(<ClassWithNull />);
  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('handles elements in props', () => {
  const shallowed = shallow(
    <WrapperComponent
      element={
        <BasicPure>
          <strong>Hello!</strong>
        </BasicPure>
      }
    />,
  );
  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('handles elements in prop arrays', () => {
  const shallowed = shallow(
    <WrapperComponent
      elements={[
        <BasicPure>
          <strong>Hello!</strong>
        </BasicPure>,
      ]}
    />,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('handles elements in prop objects', () => {
  const shallowed = shallow(
    <WrapperComponent
      element={{
        element: (
          <BasicPure>
            <strong>Hello!</strong>
          </BasicPure>
        ),
        nestedElements: [
          <BasicPure>
            <strong>Hello again!</strong>
          </BasicPure>,
        ],
      }}
    />,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('ignores non-plain objects', () => {
  function TestConstructor() {
    this._test = true;
  }

  const shallowed = shallow(
    <WrapperComponent instance={new TestConstructor()} />,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('skips undefined props', () => {
  const shallowed = shallow(<BasicWithUndefined>Hello!</BasicWithUndefined>);

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('renders multiple elements as a result of find', () => {
  const shallowed = shallow(<BasicWithAList />);
  expect(shallowToJson(shallowed.find('li'))).toMatchSnapshot();
});

it('outputs the key prop', () => {
  const shallowed = shallow(<div key={1} />);
  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('doesnt output the key prop when noKey option is passed', () => {
  const shallowed = shallow(<div key={1} />);
  expect(shallowToJson(shallowed, {noKey: true})).toMatchSnapshot();
});

it('converts function components with render returning top level arrays', () => {
  const shallowed = shallow(
    <ArrayRender>
      <strong>Hello!</strong>
    </ArrayRender>,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('converts class components with render returning top level arrays', () => {
  const shallowed = shallow(
    <ClassArrayRender>
      <strong>Hello!</strong>
    </ClassArrayRender>,
  );

  expect(shallowToJson(shallowed)).toMatchSnapshot();
});
