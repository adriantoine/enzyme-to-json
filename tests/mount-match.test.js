/* eslint-env jest */

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mountToJson from '../src/mount';
import {elementToObject, Table, TobeList} from './fixtures/match-object';

Enzyme.configure({adapter: new Adapter()});

const deepOptions = {mode: 'deep'};
const shallowOptions = {mode: 'shallow'};

describe('Table', () => {
  // Mock child components to omit irrelevant props for shallow match,
  // especially event handlers so not to be redundant with interaction tests.
  function TableHead() {}
  function TableRow() {}
  function Button() {}
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
      expect(received).toMatchObject(
        elementToObject(
          <thead>
            <tr>
              <th>
                <button title="add row">+</button>
              </th>
              <th>{fields[0].label}</th>
              <th>{fields[1].label}</th>
              <th>{fields[2].label}</th>
            </tr>
          </thead>,
        ),
      );
    });

    test('at tr', () => {
      // Be careful. Don’t duplicate the application code.
      const i = 1;
      const received = mountToJson($it.find('tbody tr').at(i), deepOptions);
      expect(received).toMatchSnapshot();
      expect(received).toMatchObject(
        elementToObject(
          <tr>
            <td key="">
              <button title="delete row">-</button>
            </td>
            {fields.map(({key}) => <td key={key}>{records[i][key]}</td>)}
          </tr>,
        ),
      );
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
      expect(received).toMatchObject(
        elementToObject(
          <table>
            <TableHead fields={fields} />
            <tbody>
              <TableRow fields={fields} record={records[0]} />
              <TableRow fields={fields} record={records[1]} />
              <TableRow fields={fields} record={records[2]} />
            </tbody>
          </table>,
        ),
      );
    });

    test('at thead', () => {
      const received = mountToJson($it.find('thead'), shallowOptions);
      expect(received).toMatchSnapshot();
      expect(received).toMatchObject(
        elementToObject(
          <thead>
            <tr>
              <th>
                <Button title="add row" text="+" />
              </th>
              <th>{fields[0].label}</th>
              <th>{fields[1].label}</th>
              <th>{fields[2].label}</th>
            </tr>
          </thead>,
        ),
      );
    });

    test('at tbody', () => {
      const received = mountToJson($it.find('tbody'), shallowOptions);
      expect(received).toMatchSnapshot();
      expect(received).toMatchObject(
        elementToObject(
          <tbody>
            <TableRow fields={fields} record={records[0]} />
            <TableRow fields={fields} record={records[1]} />
            <TableRow fields={fields} record={records[2]} />
          </tbody>,
        ),
      );
    });

    test('at tr', () => {
      // Be careful. Don’t duplicate the application code.
      const i = 1;
      const received = mountToJson($it.find('tbody tr').at(i), shallowOptions);
      expect(received).toMatchSnapshot();
      expect(received).toMatchObject(
        elementToObject(
          <tr>
            <td key="">
              <Button text="-" title="delete row" />
            </td>
            {fields.map(({key}) => <td key={key}>{records[i][key]}</td>)}
          </tr>,
        ),
      );
    });
  });
});

describe('TobeList', () => {
  function TobeItem() {} // mock, and provide only relevant props

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
    const expected = elementToObject(
      <ul>
        <li style={{textDecoration: 'line-through'}}>testing is painless</li>
        <li style={{textDecoration: 'none'}}>more is less</li>
        <li style={{textDecoration: 'none'}}>less is more</li>
      </ul>,
    );

    expect(received).toMatchObject(expected);

    // Callback props usually prevent toEqual assertion.
    expect(received).toEqual(expected);
  });

  it('matches functional components to minimum depth at a descendant', () => {
    const received = mountToJson(mount(<TobeList items={items} />).find('ul'), {
      mode: 'shallow',
      noKey: true,
    });
    const expected = elementToObject(
      <ul>
        <TobeItem text="testing is painless" is={false} />
        <TobeItem text="more is less" is />
        <TobeItem text="less is more" is />
      </ul>,
    );

    expect(received).toMatchObject(expected);

    // Callback props usually prevent toEqual assertion.
    expect(received).toEqual(expected);
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
    const expected = elementToObject(
      <li style={{textDecoration: 'none'}}>more is less</li>,
    );

    // When all descendants are DOM nodes, deep and shallow are equivalent.
    expect(receivedDeep).toMatchObject(expected);
    expect(receivedShallow).toMatchObject(expected);

    // Callback props usually prevent toEqual assertion.
    expect(receivedDeep).toEqual(expected);
    expect(receivedShallow).toEqual(expected);
  });
});
