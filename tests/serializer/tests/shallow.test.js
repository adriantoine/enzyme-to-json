/* eslint-env jest */

import React from 'react';
import {shallow} from 'enzyme';
import {BasicPure, BasicWithUndefined} from './fixtures/pure-function';
import {BasicClass, ClassWithPure, ClassWithNull} from './fixtures/class';

function WrapperComponent(props) {
  return <BasicPure {...props}/>;
}

it('converts basic pure shallow', () => {
  const shallowed = shallow(
    <BasicPure className="pure"><strong>Hello!</strong></BasicPure>
    );

  expect(shallowed).toMatchSnapshot();
});

it('converts basic class shallow', () => {
  const shallowed = shallow(
    <BasicClass className="class"><strong>Hello!</strong></BasicClass>
    );

  expect(shallowed).toMatchSnapshot();
});

it('converts a class mount with a pure function in it', () => {
  const shallowed = shallow(
    <ClassWithPure className="class"><strong>Hello!</strong></ClassWithPure>
    );
  expect(shallowed).toMatchSnapshot();
});

it('handles a component which returns null', () => {
  const shallowed = shallow(
    <ClassWithNull/>
    );
  expect(shallowed).toMatchSnapshot();
});

it('handles elements in props', () => {
  const shallowed = shallow(
    <WrapperComponent element={<BasicPure><strong>Hello!</strong></BasicPure>}/>
    );
  expect(shallowed).toMatchSnapshot();
});

it('handles elements in prop arrays', () => {
  const shallowed = shallow(
    <WrapperComponent
      elements={[
        <BasicPure><strong>Hello!</strong></BasicPure>,
      ]}
      />
    );
  expect(shallowed).toMatchSnapshot();
});

it('handles elements in prop objects', () => {
  const shallowed = shallow(
    <WrapperComponent
      element={{
        element: <BasicPure><strong>Hello!</strong></BasicPure>,
        nestedElements: [
          <BasicPure><strong>Hello again!</strong></BasicPure>,
        ],
      }}
      />
    );

  expect(shallowed).toMatchSnapshot();
});

it('ignores non-plain objects', () => {
  function TestConstructor() {
    this._test = true;
  }

  const shallowed = shallow(
    <WrapperComponent instance={new TestConstructor()}/>
    );

  expect(shallowed).toMatchSnapshot();
});

it('skips undefined props', () => {
  const shallowed = shallow(
    <BasicWithUndefined>Hello!</BasicWithUndefined>
    );

  expect(shallowed).toMatchSnapshot();
});
