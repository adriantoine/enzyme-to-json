/* eslint-env jest */

import React from 'react';
import Enzyme, {render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BasicPure} from './fixtures/pure-function';
import {BasicClass} from './fixtures/class';

Enzyme.configure({adapter: new Adapter()});

it('converts basic pure render', () => {
  const rendered = render(
    <BasicPure className="pure">
      <strong>Hello!</strong>
    </BasicPure>,
  );

  expect(rendered).toMatchSnapshot();
});

it('converts basic class render', () => {
  const rendered = render(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(rendered).toMatchSnapshot();
});
