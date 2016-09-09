/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from '../src';
import { BasicPure } from './fixtures/pure-function';
import { BasicClass } from './fixtures/class';

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
