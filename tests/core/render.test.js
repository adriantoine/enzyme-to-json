/* eslint-env jest */

import React from 'react';
import { render } from 'enzyme';
import { renderToJson } from '../../src';
import { BasicPure } from './fixtures/pure-function';
import { BasicClass, ClassWithNull } from './fixtures/class';

it('converts basic pure render', () => {
    const rendered = render(
        <BasicPure className="pure"><strong>Hello!</strong></BasicPure>
    );

    expect(renderToJson(rendered)).toMatchSnapshot();
});

it('converts basic class render', () => {
    const rendered = render(
        <BasicClass className="class"><strong>Hello!</strong></BasicClass>
    );

    expect(renderToJson(rendered)).toMatchSnapshot();
});

it('handles a component which returns null', () => {
    const rendered = render(
      <ClassWithNull />
    );

    expect(renderToJson(rendered)).toMatchSnapshot();
});
