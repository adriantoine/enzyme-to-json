import React from 'react';

const Lazy = React.lazy(() => Promise.resolve(<div>lazy div</div>));
const Memo = React.memo(() => <div>memoized div</div>);

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

export const FalsyChildren = ({falsy}) => {
  return <div>{!!falsy && <div>Yep</div>}</div>;
};

export const FragmentAsChild = () => (
  <div>
    <React.Fragment>
      <span />
      <div />
      <button />
    </React.Fragment>
  </div>
);

export const FragmentAsRoot = () => (
  <React.Fragment>
    <span />
    <div />
    <button />
  </React.Fragment>
);

export const SuspenseAsChild = () => (
  <div>
    <React.Suspense>
      <Lazy />
      <div />
      <button />
    </React.Suspense>
  </div>
);

export const SuspenseAsRoot = () => (
  <React.Suspense>
    <span />
    <div />
    <Lazy />
  </React.Suspense>
);

export const ComponentWithMemo = () => (
  <div>
    <span />
    <Memo />
  </div>
);

export const ComponentWithChildren = ({children}) => <span>{children}</span>;

export const WithDefaultProps = ({value, falsyValue}) => <div>{value},{falsyValue}</div>;

WithDefaultProps.defaultProps = {
  value: 'hi there',
  falsyValue: false,
};
