import React from 'react';

function BasicComponent(props) {
  return (
    <div
      className={`basic-memo ${props.className}`}
      onClick={function handleOnClick() {}}
    >
      <div id="group-id" className="group">
        <span className="empty" />
      </div>
    </div>
  );
}

export const BasicMemo = React.memo(BasicComponent);

function ArrayRender(props) {
  return [
    <div className="test" key="test">
      Test
    </div>,
    <div className="test2" key="test2">
      Test 2
    </div>,
    <div className={props.className} key="test3">
      Test 3
    </div>,
  ];
}

export const ArrayMemo = React.memo(ArrayRender);
