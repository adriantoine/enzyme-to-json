import React, {Component} from 'react';
import omitBy from 'lodash.omitby';

const reactSymbol = Symbol.for('react.element');

// Given React element, return test object.
// Analogous to proposed relevantTestObject function,
// except this version neither omits empty props object
// nor irrelevant children.
export function elementToObject({type, props}) {
  const children = props.children;
  return {
    $$typeof: Symbol.for('react.test.json'),
    type: typeof type === 'string'
      ? type
      : typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : 'Unknown',
    props: children === undefined
      ? props
      : omitBy(props, (value, key) => key === 'children'),
    children: children === undefined ? null : childrenToObject(children, []),
  };
}

function childrenToObject(arg, array) {
  if (Array.isArray(arg)) {
    // Iteration adjacent to other rendered output: { array.map(item => node) }
    return arg.reduce(
      (reduced, child) => childrenToObject(child, reduced),
      array,
    );
  }

  array.push(arg && arg.$$typeof === reactSymbol ? elementToObject(arg) : arg);
  return array;
}

export class Table extends Component {
  render() {
    const {addRow, deleteRow, fields, records} = this.props;
    return (
      <table>
        <TableHead addRow={addRow} fields={fields} />
        <tbody>
          {records.map(record => (
            <TableRow
              key={record.id}
              deleteRow={deleteRow}
              fields={fields}
              record={record}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export class TableHead extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th key="">
            <Button
              onClick={() => {
                this.props.addRow();
              }}
              text="+"
              title="add row"
            />
          </th>
          {this.props.fields.map(field => (
            <th key={field.key} scope="col">{field.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export class TableRow extends Component {
  render() {
    const {deleteRow, fields, record} = this.props;
    return (
      <tr>
        <td key="">
          <Button
            onClick={() => {
              deleteRow(record.id);
            }}
            text="-"
            title="delete row"
          />
        </td>
        {fields.map(({key}) => <td key={key}>{record[key]}</td>)}
      </tr>
    );
  }
}

function Button({onClick, text, title}) {
  return <button onClick={onClick} title={title}>{text}</button>;
}

export function TobeList({items}) {
  return (
    <ul>
      {items.map(item => (
        <TobeItem key={item.id} is={item.is} text={item.text} />
      ))}
    </ul>
  );
}

function TobeItem({is, text}) {
  return (
    <li
      style={{
        textDecoration: is ? 'none' : 'line-through',
      }}
    >
      {text}
    </li>
  );
}
