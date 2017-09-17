/* eslint-env jest */

import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from '../../src';
import {
  BasicPure,
  BasicWithUndefined,
  BasicWithAList,
  ComponentWithAZeroChildren,
} from './fixtures/pure-function';
import {
  BasicClass,
  ClassWithPure,
  ClassWithDirectPure,
  ClassWithDirectComponent,
  ClassWithNull,
} from './fixtures/class';

it('converts basic pure mount', () => {
  const mounted = mount(
    <BasicPure className="pure">
      <strong>Hello!</strong>
    </BasicPure>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts pure mount with mixed children', () => {
  const mounted = mount(<BasicPure>Hello {'world'}!</BasicPure>);
  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts basic class mount', () => {
  const mounted = mount(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts class mount with mixed children', () => {
  const mounted = mount(<BasicClass>Hello {'world'}!</BasicClass>);
  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts a class mount with a pure function in it', () => {
  const mounted = mount(
    <ClassWithPure className="class">
      <strong>Hello!</strong>
    </ClassWithPure>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts a class mount with a pure function in it as a direct child', () => {
  const mounted = mount(
    <ClassWithDirectPure className="class">
      <strong>Hello!</strong>
    </ClassWithDirectPure>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts a class mount with a class component in it as a direct child', () => {
  const mounted = mount(
    <ClassWithDirectComponent className="class">
      <strong>Hello!</strong>
    </ClassWithDirectComponent>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('handles a component which returns null', () => {
  const mounted = mount(<ClassWithNull />);

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('skips undefined props', () => {
  const mounted = mount(<BasicWithUndefined>Hello!</BasicWithUndefined>);

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('renders zero-children', () => {
  const mounted = mount(<ComponentWithAZeroChildren />);
  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('renders multiple elements as a result of find', () => {
  const mounted = mount(<BasicWithAList />);
  expect(mountToJson(mounted.find('li'))).toMatchSnapshot();
});

it('outputs the key prop', () => {
  const mounted = mount(<div key={1} />);
  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('doesnt output the key prop when noKey option is passed', () => {
  const mounted = mount(<div key={1} />);
  expect(mountToJson(mounted, {noKey: true})).toMatchSnapshot();
});
