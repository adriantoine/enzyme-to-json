/* eslint-env jest */

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mountToJson from '../src/mount';
import {Table, TobeList} from './fixtures/match-object';

Enzyme.configure({adapter: new Adapter()});

const deepOptions = {mode: 'deep'};
const shallowOptions = {mode: 'shallow'};

describe('Table', () => {
  // Mock child components to omit irrelevant props for shallow match,
  // especially event handlers so not to be redundant with interaction tests.
  function addRow() {}
  function deleteRow() {}

  // suggestions in a game of Cluedo
  const fields = [
    {key: 'who', label: 'qui'},
    {key: 'where', label: 'où'},
    {key: 'which', label: 'lequel'},
  ];
  const records = [
    {id: 3, who: 'Plum', where: 'study', which: 'spanner'},
    {id: 2, who: 'Peacock', where: 'library', which: 'rope'},
    {id: 1, who: 'Green', where: 'conservatory', which: 'pipe'},
  ];

  describe('matches class components to maximum depth', () => {
    const $it = mount(
      <Table
        addRow={addRow}
        deleteRow={deleteRow}
        fields={fields}
        records={records}
      />,
    );

    test('at thead', () => {
      const received = mountToJson($it.find('thead'), deepOptions);
      expect(received).toMatchSnapshot();
    });

    test('at tr', () => {
      // Be careful. Don’t duplicate the application code.
      const i = 1;
      const received = mountToJson($it.find('tbody tr').at(i), deepOptions);
      expect(received).toMatchSnapshot();
    });
  });

  describe('matches class components to minimum depth', () => {
    const $it = mount(
      <Table
        addRow={addRow}
        deleteRow={deleteRow}
        fields={fields}
        records={records}
      />,
    );

    test('at table', () => {
      const received = mountToJson($it.find('table'), shallowOptions);
      expect(received).toMatchSnapshot();
    });

    test('at thead', () => {
      const received = mountToJson($it.find('thead'), shallowOptions);
      expect(received).toMatchSnapshot();
    });

    test('at tbody', () => {
      const received = mountToJson($it.find('tbody'), shallowOptions);
      expect(received).toMatchSnapshot();
    });

    test('at tr', () => {
      // Be careful. Don’t duplicate the application code.
      const i = 1;
      const received = mountToJson($it.find('tbody tr').at(i), shallowOptions);
      expect(received).toMatchSnapshot();
    });
  });
});

describe('TobeList', () => {
  // statements which are to be, or not to be :)
  const items = [
    {
      id: 0,
      is: false,
      text: 'testing is painless',
    },
    {
      id: 1,
      is: true,
      text: 'more is less',
    },
    {
      id: 2,
      is: true,
      text: 'less is more',
    },
  ];

  it('matches functional components to maximum depth', () => {
    const received = mountToJson(
      mount(<TobeList items={items} />),
      deepOptions,
    );

    expect(received).toMatchSnapshot();
  });

  it('matches functional components to minimum depth at a descendant', () => {
    const received = mountToJson(mount(<TobeList items={items} />).find('ul'), {
      mode: 'shallow',
      noKey: true,
    });

    expect(received).toMatchSnapshot();
  });

  it('matches functional components to either depth at a descendant', () => {
    const element = <TobeList items={items} />;
    const receivedDeep = mountToJson(
      mount(element)
        .find('li')
        .at(1),
      deepOptions,
    );
    const receivedShallow = mountToJson(
      mount(element)
        .find('li')
        .at(1),
      shallowOptions,
    );

    // When all descendants are DOM nodes, deep and shallow are equivalent.
    expect(receivedDeep).toMatchSnapshot();
    expect(receivedShallow).toMatchSnapshot();
  });
});
