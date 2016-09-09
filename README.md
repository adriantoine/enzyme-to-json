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
