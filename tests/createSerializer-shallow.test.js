/* eslint-env jest */

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import createSerializer from '../src/createSerializer';
import {BasicPure} from './fixtures/pure-function';

expect.addSnapshotSerializer(createSerializer());

Enzyme.configure({adapter: new Adapter()});

it('renders basic pure component', () => {
  const mounted = mount(
    <BasicPure className="pure">
      <strong>Hello!</strong>
    </BasicPure>,
  );

  expect(mounted).toMatchSnapshot();
});

it('outputs the key prop', () => {
  const mounted = mount(
    <ul>
      <li key={1} />
      <li key={2} />
    </ul>,
  );
  expect(mounted).toMatchSnapshot();
});
