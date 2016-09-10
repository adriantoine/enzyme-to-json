# enzyme-to-json
[![npm Version](https://img.shields.io/npm/v/enzyme-to-json.svg)](https://www.npmjs.com/package/enzyme-to-json)
[![Build Status](https://travis-ci.org/trayio/enzyme-to-json.svg?branch=master)](https://travis-ci.org/trayio/enzyme-to-json)
[![License](https://img.shields.io/npm/l/enzyme-to-json.svg)](https://www.npmjs.com/package/enzyme-to-json)

Convert [Enzyme](http://airbnb.io/enzyme/) wrappers to a format compatible with [Jest snapshot testing](https://facebook.github.io/jest/docs/tutorial-react.html#snapshot-testing).

# Install
```console
$ npm install --save-dev enzyme-to-json
```

# Example
```js
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

class MyComponent extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = { count: 1 };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.handleClick}>
        <span className="count">{this.state.count}</span>
        {this.props.children}
      </div>
    );
  }
}

it('renders correctly', () => {
  const wrapper = shallow(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

// generates:

exports[`test renders correctly 1`] = `
<div
  className="my-component"
  onClick={[Function bound handleClick]}>
  <span
  className="count">
  1
  </span>
  <strong>
  Hello World!
  </strong>
</div>
`;
```
It becomes especially handy as you can use all [Enzyme](http://airbnb.io/enzyme/) features like `find` or `setState`:
```js
it('renders span after setState', () => {
  const wrapper = shallow(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  wrapper.setState({ count: 42 });
  expect(shallowToJson(wrapper.find('span'))).toMatchSnapshot();
});

// generates:

exports[`test renders span after setState 1`] = `
<span
  className="count">
  42
</span>
`;
```
It could be useful if you want more focused tests.

This library also supports [`mount`](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md) and [`render`](https://github.com/airbnb/enzyme/blob/master/docs/api/render.md) Enzyme wrappers:
```js
import { mountToJson, renderToJson } from 'enzyme-to-json';

it('mounts my component', () => {
  const wrapper = mount(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(mountToJson(wrapper)).toMatchSnapshot();
});

it('renders my component', () => {
  const wrapper = render(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(renderToJson(wrapper)).toMatchSnapshot();
});
```

# Focused tests

One thing I really like about this library is the ability to use `find` and Enzyme selectors to have focused tests.

For example, with `react-test-renderer` (used in [Jest documentation](https://facebook.github.io/jest/docs/tutorial-react.html#snapshot-testing)), you would test a component like that:
```js
import React from 'react';
import renderer from 'react-test-renderer';

const MyComponent = props => (
    <div className={`my-component ${props.className}`}>
        <h3>Component Heading</h3>
        <span>{props.children}</span>
    </div>
);

it('renders a `strong` correctly', () => {
    const wrapper = renderer.create(
        <MyComponent className="strong-class">
            <strong>Hello World!</strong>
        </MyComponent>
    );

    expect(wrapper).toMatchSnapshot();
});

it('renders a `span` correctly', () => {
    const wrapper = renderer.create(
        <MyComponent className="span-class">
            <span>Hello World!</span>
        </MyComponent>
    );

    expect(wrapper).toMatchSnapshot();
});
```
and so on, handling all test cases. The problem, is that when you decide to change `Component Heading` to `Component Title`, you will get a failing snapshot test for each test with a long output like that:
```diff
● renders a `strong` correctly

Received value does not match the stored snapshot 1.

- Snapshot
+ Received

  <div
    className="my-component strong-class">
    <h3>
-     Component Heading
+     Component Title
    </h3>
    <span>
      <strong>
        Hello World!
      </strong>
    </span>
  </div>

  at Object.<anonymous> (test/focused.test.js:22:21)
  at process._tickCallback (internal/process/next_tick.js:103:7)

● renders a `span` correctly

Received value does not match the stored snapshot 1.

- Snapshot
+ Received

  <div
    className="my-component span-class">
    <h3>
-     Component Heading
+     Component Title
    </h3>
    <span>
      <span>
        Hello World!
      </span>
    </span>
  </div>

  at Object.<anonymous> (test/focused.test.js:32:21)
  at process._tickCallback (internal/process/next_tick.js:103:7)
```
and so on, you may have 10 or more snapshot tests for the same component to handle different test cases.

When using Enzyme `find` helper, you can write your tests focusing on a specific part of the output, like that:
```js
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

const MyComponent = props => (
    <div className={`my-component ${props.className}`}>
        <h3>Component Heading</h3>
        <span>{props.children}</span>
    </div>
);

it('renders the right title', () => {
    const wrapper = shallow(
        <MyComponent className="strong-class"/>
    );

    expect(shallowToJson(wrapper.find('h3'))).toMatchSnapshot();
});

it('renders a `strong` correctly', () => {
    const wrapper = shallow(
        <MyComponent className="strong-class">
            <strong>Hello World!</strong>
        </MyComponent>
    );

    expect(shallowToJson(wrapper.find('span').first())).toMatchSnapshot();
});

it('renders a `span` correctly', () => {
    const wrapper = shallow(
        <MyComponent className="span-class">
            <span>Hello World!</span>
        </MyComponent>
    );

    expect(shallowToJson(wrapper.find('span').first())).toMatchSnapshot();
});
```
Testing that the component renders a `span` and a `strong` is in a different test from testing that the title is correct and they will only fail if the component doesn't render `span` or `strong` correctly. When the title changes, only the first snapshot test will fail:
```diff
● renders the right title

Received value does not match the stored snapshot 1.

- Snapshot
+ Received

  <h3>
-   Component Heading
+   Component Title
  </h3>

  at Object.<anonymous> (test/focused.test.js:19:93)
  at process._tickCallback (internal/process/next_tick.js:103:7)
```
