/* eslint-env jest */

import React from 'react';
import Enzyme, {render} from 'enzyme';
import omitBy from 'lodash/omitBy';
import Adapter from 'enzyme-adapter-react-16';

import renderToJson from '../src/render';
import {
  BasicPure,
  BasicWithAList,
  ArrayRender,
  FragmentAsChild,
  FragmentAsRoot,
} from './fixtures/pure-function';
import {
  BasicClass,
  ClassWithNull,
  ClassWithNullChildren,
  ClassArrayRender,
} from './fixtures/class';

Enzyme.configure({adapter: new Adapter()});

it('doesnt break when called without arguments', () => {
  expect(renderToJson()).toBe(null);
  expect(renderToJson([null])).toBe(null);
  expect(renderToJson(['a'])).toBe(null);
});

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

it('handles a component having null children', () => {
  const rendered = render(<ClassWithNullChildren />);
  expect(renderToJson(rendered)).toMatchSnapshot();
});

it('renders multiple elements as a result of find', () => {
  const rendered = render(<BasicWithAList />);
  expect(renderToJson(rendered.find('li'))).toMatchSnapshot();
});

it('converts function components with render returning top level arrays', () => {
  const rendered = render(
    <ArrayRender>
      <strong>Hello!</strong>
    </ArrayRender>,
  );

  expect(renderToJson(rendered)).toMatchSnapshot();
});

it('converts class components with render returning top level arrays', () => {
  const rendered = render(
    <ClassArrayRender>
      <strong>Hello!</strong>
    </ClassArrayRender>,
  );

  expect(renderToJson(rendered)).toMatchSnapshot();
});

it('accepts a map option allowing to customize content', () => {
  const rendered = render(<strong>Hello!</strong>);

  expect(
    renderToJson(rendered, {
      map: json => ({...json, children: ['Goodbye!']}),
    }),
  ).toMatchSnapshot();
});

it('accepts a map option allowing to customize content of all nested components', () => {
  const rendered = render(
    <div randomlygeneratedkey={Date.now()} className="wrapper">
      <strong randomlygeneratedkey={Date.now()}>Hello!</strong>
      <strong className="strong2">Hello 2</strong>
    </div>,
  );

  expect(
    renderToJson(rendered, {
      map: json => ({
        ...json,
        props: omitBy(json.props, (val, key) => key === 'randomlygeneratedkey'),
      }),
    }),
  ).toMatchSnapshot();
});

it('can skip a component I dont want to see with the map option', () => {
  const rendered = render(
    <div>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <strong>Hello 2</strong>
    </div>,
  );

  expect(
    renderToJson(rendered, {
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
  const rendered = render(
    <div>
      <span>I am there</span>
      {false && <span>Issue</span>}
    </div>,
  );

  expect(renderToJson(rendered)).toMatchSnapshot();
});

it('renders a component that has a child fragment', () => {
  const wrapper = render(<FragmentAsChild />);

  expect(renderToJson(wrapper)).toMatchSnapshot();
});

it('renders a component that has a fragment root', () => {
  const wrapper = render(<FragmentAsRoot />);

  expect(renderToJson(wrapper)).toMatchSnapshot();
});
