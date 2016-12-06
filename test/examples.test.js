/* eslint-env jest */

import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from '../src';

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

    console.log(wrapper.debug());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders span after setState', () => {
    const wrapper = shallow(
        <MyComponent className="my-component">
            <strong>Hello World!</strong>
        </MyComponent>
    );

    wrapper.setState({ count: 42 });
    expect(shallowToJson(wrapper.find('span'))).toMatchSnapshot();
});
