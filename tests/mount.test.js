/* eslint-env jest */

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import omitBy from 'lodash/omitBy';
import Adapter from 'enzyme-adapter-react-16';

import mountToJson from '../src/mount';
import {
  BasicPure,
  BasicWithUndefined,
  BasicWithAList,
  ComponentWithAZeroChildren,
  ArrayRender,
  FalsyTruthyComponent,
  FalsyChildren,
} from './fixtures/pure-function';
import {
  BasicClass,
  ClassWithPure,
  ClassWithDirectPure,
  ClassWithDirectComponent,
  ClassWithNull,
  ClassArrayRender,
} from './fixtures/class';

Enzyme.configure({adapter: new Adapter()});

function WrapperComponent(props) {
  return <BasicPure {...props} />;
}

it('doesnt break when called without arguments', () => {
  expect(mountToJson()).toBe(null);
  expect(mountToJson([null])).toBe(null);
  expect(mountToJson(['a'])).toBe(null);
});

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
  const mounted = mount(
    <ul>
      <li key={1} />
      <li key={2} />
    </ul>,
  );
  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('doesnt output the key prop when noKey option is passed', () => {
  const mounted = mount(
    <ul>
      <li key={1} />
      <li key={2} />
    </ul>,
  );
  expect(mountToJson(mounted, {noKey: true})).toMatchSnapshot();
});

it('converts function components with render returning top level arrays', () => {
  const mounted = mount(
    <ArrayRender>
      <strong>Hello!</strong>
    </ArrayRender>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts class components with render returning top level arrays', () => {
  const mounted = mount(
    <ClassArrayRender>
      <strong>Hello!</strong>
    </ClassArrayRender>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('handles elements in prop arrays', () => {
  const mounted = mount(
    <WrapperComponent
      elements={[
        <BasicPure>
          <strong>Hello!</strong>
        </BasicPure>,
      ]}
    />,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('handles elements in prop objects', () => {
  const mounted = mount(
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

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('accepts a map option allowing to customize content', () => {
  const mounted = mount(<strong>Hello!</strong>);

  expect(
    mountToJson(mounted, {
      map: json => ({...json, children: ['Goodbye!']}),
    }),
  ).toMatchSnapshot();
});

it('accepts a map option allowing to customize content of all nested components', () => {
  const mounted = mount(
    <div randomlygeneratedkey={Date.now()} className="wrapper">
      <strong randomlygeneratedkey={Date.now()}>Hello!</strong>
      <strong className="strong2">Hello 2</strong>
    </div>,
  );

  expect(
    mountToJson(mounted, {
      map: json => ({
        ...json,
        props: omitBy(json.props, (val, key) => key === 'randomlygeneratedkey'),
      }),
    }),
  ).toMatchSnapshot();
});

it('can skip a component I dont want to see with the map option', () => {
  const mounted = mount(
    <div>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <strong>Hello 2</strong>
    </div>,
  );

  expect(
    mountToJson(mounted, {
      map: json => {
        if (json.type === 'ul') {
          return null;
        }
        return json;
      },
    }),
  ).toMatchSnapshot();
});

it('outputs the snapshot even with inline JSX conditions being falsy', () => {
  const mounted = mount(
    <div>
      <span>I am there</span>
      {false && <span>Issue</span>}
    </div>,
  );

  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('outputs an empty string when a component returns false', () => {
  const mounted = mount(<FalsyTruthyComponent foo={false} />);
  expect(mountToJson(mounted)).toMatchSnapshot();
});

it('outputs an empty string when a component has false chidren', () => {
  const mounted = mount(<FalsyChildren falsy={false} />);
  expect(mountToJson(mounted)).toMatchSnapshot();
});
