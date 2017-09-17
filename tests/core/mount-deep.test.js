/* eslint-env jest */

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mountToDeepJson} from '../../src/mount';
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

Enzyme.configure({adapter: new Adapter()});

it('converts basic pure mount', () => {
  const mounted = mount(
    <BasicPure className="pure">
      <strong>Hello!</strong>
    </BasicPure>,
  );

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('converts pure mount with mixed children', () => {
  const mounted = mount(<BasicPure>Hello {'world'}!</BasicPure>);

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('converts basic class mount', () => {
  const mounted = mount(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('converts class mount with mixed children', () => {
  const mounted = mount(<BasicClass>Hello {'world'}!</BasicClass>);

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('converts a class mount with a pure function in it', () => {
  const mounted = mount(
    <ClassWithPure className="class">
      <strong>Hello!</strong>
    </ClassWithPure>,
  );

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('converts a class mount with a pure function in it as a direct child', () => {
  const mounted = mount(
    <ClassWithDirectPure className="class">
      <strong>Hello!</strong>
    </ClassWithDirectPure>,
  );

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('converts a class mount with a class component in it as a direct child', () => {
  const mounted = mount(
    <ClassWithDirectComponent className="class">
      <strong>Hello!</strong>
    </ClassWithDirectComponent>,
  );

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('handles a component which returns null', () => {
  const mounted = mount(<ClassWithNull />);

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('includes undefined props', () => {
  const mounted = mount(<BasicWithUndefined>Hello!</BasicWithUndefined>);

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('renders zero-children', () => {
  const mounted = mount(<ComponentWithAZeroChildren />);

  expect(mountToDeepJson(mounted)).toMatchSnapshot();
});

it('renders multiple elements as a result of find', () => {
  const mounted = mount(<BasicWithAList />);

  expect(mountToDeepJson(mounted.find('li'))).toMatchSnapshot();
});
