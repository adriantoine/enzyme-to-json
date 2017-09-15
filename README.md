# enzyme-to-json
[![Build Status](https://img.shields.io/travis/adriantoine/enzyme-to-json.svg?branch=master&style=flat-square)](https://travis-ci.org/adriantoine/enzyme-to-json)
[![codecov](https://img.shields.io/codecov/c/github/adriantoine/enzyme-to-json.svg?style=flat-square)](https://codecov.io/gh/adriantoine/enzyme-to-json)
[![Dependency Status](https://img.shields.io/gemnasium/adriantoine/enzyme-to-json.svg?style=flat-square)](https://gemnasium.com/github.com/adriantoine/enzyme-to-json)

[![npm Version](https://img.shields.io/npm/v/enzyme-to-json.svg?style=flat-square)](https://www.npmjs.com/package/enzyme-to-json)
[![License](https://img.shields.io/npm/l/enzyme-to-json.svg?style=flat-square)](https://www.npmjs.com/package/enzyme-to-json)
[![Downloads](https://img.shields.io/npm/dm/enzyme-to-json.svg?style=flat-square)](https://npm-stat.com/charts.html?package=enzyme-to-json)

Convert [Enzyme](http://airbnb.io/enzyme/) wrappers to a format compatible with [Jest snapshot testing](https://facebook.github.io/jest/docs/tutorial-react.html#snapshot-testing).

# Install
```console
$ npm install --save-dev enzyme-to-json
```

# Usage

## Helper

```js
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

class MyComponent extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = { count: 1 };
  }

  handleClick() {
    this.setState(({ count }) => ({ count: count + 1 }));
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

  expect(toJson(wrapper)).toMatchSnapshot();
});

// generates:

exports[`renders correctly 1`] = `
<div
  className="my-component"
  onClick={[Function]}
>
  <span
    className="count"
  >
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
  expect(toJson(wrapper.find('span'))).toMatchSnapshot();
});

// generates:

exports[`renders span after setState 1`] = `
<span
  className="count"
>
  42
</span>
`;
```
It could be useful if you want more focused tests.

This library also supports [`mount`](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md) and [`render`](https://github.com/airbnb/enzyme/blob/master/docs/api/render.md) Enzyme wrappers:
```js
it('mounts my component', () => {
  const wrapper = mount(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders my component', () => {
  const wrapper = render(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
```

You can still use the `shallowToJson`, `mountToJson` and `renderToJson` wrappers from the earlier versions, importing them like this:
```
import {shallowToJson, mountToJson, renderToJson} from 'enzyme-to-json';
```

## Serializer

If you are using [Jest v17.0.0 or higher](https://github.com/facebook/jest/blob/master/CHANGELOG.md#jest-1700), you can also use a Jest serializer.

Add this to your Jest configuration:

```js
"snapshotSerializers": ["<rootDir>/node_modules/enzyme-to-json/serializer"]
```

If you use [Jest v18.0.0 or higher](https://github.com/facebook/jest/blob/master/CHANGELOG.md#jest-1800), you can use a shorthand:

```js
"snapshotSerializers": ["enzyme-to-json/serializer"]
```

If you use [Jest v19.0.0 or higher](https://github.com/facebook/jest/blob/master/CHANGELOG.md#jest-1900), you can [add a snapshot serializer](http://facebook.github.io/jest/docs/expect.html#expectaddsnapshotserializerserializer) in individual test files instead of modifying Jest configuration:

* to make the dependency explicit instead of implicit
* to avoid limits to configuration that might cause you to eject from `create-react-app`

```js
import serializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(serializer);
```

Then you can use all of the above without having to include or use the `toJson` function! For example:

```js
it('mounts my component', () => {
  const wrapper = shallow(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(wrapper).toMatchSnapshot();
});

it('mounts my component', () => {
  const wrapper = mount(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders my component', () => {
  const wrapper = render(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(wrapper).toMatchSnapshot();
});
```

This is inspired by [jest-serializer-enzyme](https://github.com/rogeliog/jest-serializer-enzyme), I first [added a note](https://github.com/adriantoine/enzyme-to-json/commit/4b2ffc388aaaeb639961c29d271d02acbfe5df40) to `jest-serializer-enzyme` but I then realised that the output is different, so it is not retro compatible with `enzyme-to-json` because it's using Enzyme `debug` helper which doesn't put each prop on a separate line.

For example the output of the first example would be:

```js
exports[`renders correctly 1`] = `
<div className="my-component" onClick={[Function]}>
<span className="count">
1
</span>
<strong>
Hello World!
</strong>
</div>
`;
```

instead of:

```js
exports[`renders correctly 1`] = `
<div
  className="my-component"
  onClick={[Function]}
>
  <span
    className="count"
  >
    1
  </span>
  <strong>
    Hello World!
  </strong>
</div>
`;
```

which is different from ours. So, if you want to move from `enzyme-to-json` to `jest-serializer-enzyme`, you would have to update all snapshots.

The output is a matter of preference, also `jest-serializer-enzyme` only supports the `shallow` wrapper for now, so if you're already using `enzyme-to-json`, it's a bit easier to use our serializer for now. Thanks to [@rogeliog](https://github.com/rogeliog) for bringing up the idea.

# Focused tests with `find` method

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
    className="my-component strong-class"
  >
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
    className="my-component span-class"
  >
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
import toJson from 'enzyme-to-json';

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

    expect(toJson(wrapper.find('h3'))).toMatchSnapshot();
});

it('renders a `strong` correctly', () => {
    const wrapper = shallow(
        <MyComponent className="strong-class">
            <strong>Hello World!</strong>
        </MyComponent>
    );

    expect(toJson(wrapper.find('span').first())).toMatchSnapshot();
});

it('renders a `span` correctly', () => {
    const wrapper = shallow(
        <MyComponent className="span-class">
            <span>Hello World!</span>
        </MyComponent>
    );

    expect(toJson(wrapper.find('span').first())).toMatchSnapshot();
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

# Focused tests for `mount` wrapper

Because an Enzyme `mount` wrapper has a hybrid render tree of React components and DOM elements, `mountToJson`, `toJson`, and the serializer return both types of nodes. However, you can focus on whichever nodes are more relevant as the expected result of a test.

## `mountToDeepJson`

Given an enzyme `mount` wrapper, especially from selector traversal, return a test object rendered to **maximum** depth. It contains only DOM nodes, no React components.

```js
import React from 'react';
import { mount } from 'enzyme';
import { mountToDeepJson } from 'enzyme-to-json';

test('table head has field labels and button element to add a row', () => {
  const addRow = () => {}; // a realistic example would interact with DOM :)
  const fields = [ … ];
  const records = [ … ];
  const wrapper = mount(<Table addRow={addRow} fields={fields} records={records} />);

  expect(mountToDeepJson(wrapper.find('thead'))).toMatchSnapshot();
});
```

## `mountToShallowJson`

Given an enzyme `mount` wrapper, especially from selector traversal, return a test object rendered to **minimum** depth. It might contain DOM nodes, but any children which are React components are leaves of the tree. For some tests, it might combine the benefits of the `mount` and `shallow` wrappers.

```js
import React from 'react';
import { mount } from 'enzyme';
import { mountToShallowJson } from 'enzyme-to-json';

test('table head has field labels and Button component to add a row', () => {
  const addRow = () => {}; // a realistic example would interact with DOM :)
  const fields = [ … ];
  const records = [ … ];
  const wrapper = mount(<Table addRow={addRow} fields={fields} records={records} />);

  expect(mountToShallowJson(wrapper.find('thead'))).toMatchSnapshot();
});
```


## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md).
