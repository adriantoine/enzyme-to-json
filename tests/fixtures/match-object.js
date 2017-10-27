import React, {Component} from 'react';

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
            <th key={field.key} scope="col">
              {field.label}
            </th>
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
  return (
    <button onClick={onClick} title={title}>
      {text}
    </button>
  );
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
