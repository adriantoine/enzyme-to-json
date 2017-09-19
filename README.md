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
import React, {Component} from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

class MyComponent extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {count: 1};
  }

  handleClick() {
    this.setState(({count}) => ({count: count + 1}));
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

  wrapper.setState({count: 42});
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

### Options

You can pass an option object as a second argument, for example:

```js
toJson(wrapper, {
  noKey: false,
  mode: 'deep'
});
```

| Key | Value | Description |
| --- | ----- | ----------- |
| `noKey` | `bool` | Since `v2.0.0`, the `key` prop is included in the snapshot, you can turn it off if you don't want your key to be in your snapshot by settting this option to `true`. Only works for the `mount` and `shallow` wrappers. |
| `mode` | `'deep'`, `'shallow'` | The `deep` option will return a test object rendered to **maximum** depth while the `shallow` option will return a test object rendered to **minimum** depth. Only works for the `mount` wrappers. See `mode` documentation for examples. |
| `map` | `function` | You can change each nested node of your component output by providing the map option. See `map` documentation for examples. |

## Serializer

### In Jest configuration:

```js
"snapshotSerializers": ["enzyme-to-json/serializer"]
```

### In unit tests:

```js
import serializer from 'enzyme-to-json/serializer';

expect.addSnapshotSerializer(serializer);
```
