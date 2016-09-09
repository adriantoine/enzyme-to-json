/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from '../src';
import { BasicPure } from './fixtures/pure-function';
import { BasicClass } from './fixtures/class';

it('converts basic pure shallow', () => {
    const shallowed = shallow(
        <BasicPure className="pure"><strong>Hello!</strong></BasicPure>
    );

    expect(shallowToJson(shallowed)).toMatchSnapshot();
});

it('converts basic class shallow', () => {
    const shallowed = shallow(
        <BasicClass className="class"><strong>Hello!</strong></BasicClass>
    );

    expect(shallowToJson(shallowed)).toMatchSnapshot();
});
