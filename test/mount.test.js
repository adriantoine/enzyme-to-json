/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from '../src';
import { BasicPure } from './fixtures/pure-function';
import { BasicClass, ClassWithPure } from './fixtures/class';

it('converts basic pure mount', () => {
    const mounted = mount(
        <BasicPure className="pure"><strong>Hello!</strong></BasicPure>
    );

    expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts basic class mount', () => {
    const mounted = mount(
        <BasicClass className="class"><strong>Hello!</strong></BasicClass>
    );

    expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts a class mount with a pure function in it', () => {
    const mounted = mount(
        <ClassWithPure className="class"><strong>Hello!</strong></ClassWithPure>
    );

    expect(mountToJson(mounted)).toMatchSnapshot();
});

it('converts a bunch of dom nodes', () => {
    const mounted = mount(
	<div>
            <div></div>
            <div>B<span></span></div>
	</div>
    );

    expect(mountToJson(mounted)).toMatchSnapshot();
});
