import React from 'react';

export const ForwardRefWithDefaultProps = React.forwardRef((props, ref) => (
  <div
    className={`basic-class ${props.className}`}
    onClick={function handleOnClick() {}}
    ref={ref}
  >
    <div id="group-id" className="group">
      <span>{props.children}</span>
      <span className="empty" />
    </div>
  </div>
));

ForwardRefWithDefaultProps.defaultProps = {
  value: 'hi mum',
  falsyValue: false,
};
