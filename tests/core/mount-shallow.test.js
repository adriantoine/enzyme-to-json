/* eslint-env jest */

import React from 'react';
import {mount} from 'enzyme';
import {mountToShallowJson} from '../../src';
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

  expect(mountToShallowJson(mounted.find('div').at(0))).toMatchSnapshot();
  expect(mountToShallowJson(mounted)).toMatchSnapshot();
});

it('converts pure mount with mixed children', () => {
  const mounted = mount(<BasicPure>Hello {'world'}!</BasicPure>);

  expect(mountToShallowJson(mounted.find('div').at(0))).toMatchSnapshot();
});

it('converts basic class mount', () => {
  const mounted = mount(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(mountToShallowJson(mounted.find('div').at(0))).toMatchSnapshot();
  expect(mountToShallowJson(mounted)).toMatchSnapshot();
});

it('converts class mount with mixed children', () => {
  const mounted = mount(<BasicClass>Hello {'world'}!</BasicClass>);

  expect(mountToShallowJson(mounted.find('div').at(0))).toMatchSnapshot();
});

it('converts a class mount with a pure function in it', () => {
  const mounted = mount(
    <ClassWithPure className="class">
      <strong>Hello!</strong>
    </ClassWithPure>,
  );

  expect(mountToShallowJson(mounted.find('div').at(0))).toMatchSnapshot();
});

it('converts a class mount with a pure function in it as a direct child', () => {
  const mounted = mount(
    <ClassWithDirectPure className="class">
      <strong>Hello!</strong>
    </ClassWithDirectPure>,
  );

  expect(mountToShallowJson(mounted.find('BasicPure').at(0))).toMatchSnapshot();
});

it('converts a class mount with a class component in it as a direct child', () => {
  const mounted = mount(
    <ClassWithDirectComponent className="class">
      <strong>Hello!</strong>
    </ClassWithDirectComponent>,
  );

  expect(
    mountToShallowJson(mounted.find('ClassWithPure').at(0)),
  ).toMatchSnapshot();
});

it('handles a component which returns null', () => {
  const mounted = mount(<ClassWithNull />);

  expect(mountToShallowJson(mounted.childAt(0))).toMatchSnapshot();
});

it('includes undefined props', () => {
  const mounted = mount(<BasicWithUndefined>Hello!</BasicWithUndefined>);

  expect(mountToShallowJson(mounted.find('button').at(0))).toMatchSnapshot();
});

it('renders zero-children', () => {
  const mounted = mount(<ComponentWithAZeroChildren />);

  expect(mountToShallowJson(mounted.find('div').at(0))).toMatchSnapshot();
});

it('renders multiple elements as a result of find', () => {
  const mounted = mount(<BasicWithAList />);

  expect(mountToShallowJson(mounted.find('li'))).toMatchSnapshot();
});
