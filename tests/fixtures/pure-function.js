import React from 'react';

export function BasicPure(props) {
  return (
    <div
      className={`basic-pure ${props.className}`}
      onClick={function handleOnClick() {}}
    >
      <div id="group-id" className="group">
        <span>{props.children}</span>
        <span className="empty" />
      </div>
    </div>
  );
}

export function BasicWithUndefined(props) {
  return <button disabled={props.disabled}>Hello</button>;
}

export function BasicWithAList() {
  return (
    <div>
      <ul>
        <li>0</li>
        <li>1</li>
      </ul>
    </div>
  );
}

export function ComponentWithAZeroChildren() {
  return <div>{0}</div>;
}

export function ArrayRender(props) {
  return [
    <div className="test" key="test">
      Test
    </div>,
    <div className="test2" key="test2">
      Test 2
    </div>,
    <div className="child" key="child">
      {props.children}
    </div>,
  ];
}

export const FalsyTruthyComponent = ({foo}) => {
  return foo && <div>Yep</div>;
};
