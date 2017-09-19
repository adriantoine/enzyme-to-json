# Modes of the `mount` wrapper

When running `toJson` on a mount wrapper, you can also set a mode in the options, which can be `shallow` or `deep`.

## `shallow` mode

Given an enzyme mount wrapper, especially from selector traversal, return a test object rendered to **minimum** depth. It might contain DOM nodes, but any children which are React components are leaves of the tree. For some tests, it might combine the benefits of the `mount` and `shallow` wrappers.

### Example

Given this class:

```js
class BasicClass extends Component {
  render() {
    return (
      <div
        className={`basic-class ${this.props.className}`}
        onClick={function handleOnClick() {}}
      >
        <div id="group-id" className="group">
          <span>{this.props.children}</span>
          <span className="empty" />
        </div>
      </div>
    );
  }
}
```

Here is the snapshot **without any mode**:

```js
it('converts basic class mount', () => {
  const mounted = mount(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(toJson(mounted)).toMatchSnapshot();
});

// snapshot =>

exports[`converts basic class mount 1`] = `
<BasicClass
  className="class"
>
  <div
    className="basic-class class"
    onClick={[Function]}
  >
    <div
      className="group"
      id="group-id"
    >
      <span>
        <strong>
          Hello!
        </strong>
      </span>
      <span
        className="empty"
      />
    </div>
  </div>
</BasicClass>
`;
```

And now here is the snapshot **with the `shallow` mode**:

```js
it('converts basic class mount', () => {
  const mounted = mount(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(toJson(mounted, {mode: 'shallow'})).toMatchSnapshot();
});

// snapshot =>

exports[`converts basic class mount`] = `
<BasicClass
  className="class"
/>
`;
```


## `deep` mode

Given an enzyme `mount` wrapper, especially from selector traversal, return a test object rendered to **maximum** depth. It contains only DOM nodes, no React components.

### Example

Given this class:

```js
class BasicClass extends Component {
  render() {
    return (
      <div
        className={`basic-class ${this.props.className}`}
        onClick={function handleOnClick() {}}
      >
        <div id="group-id" className="group">
          <span>{this.props.children}</span>
          <span className="empty" />
        </div>
      </div>
    );
  }
}
```

Here is the snapshot **without any mode**:

```js
it('converts basic class mount', () => {
  const mounted = mount(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(toJson(mounted)).toMatchSnapshot();
});

// snapshot =>

exports[`converts basic class mount 1`] = `
<BasicClass
  className="class"
>
  <div
    className="basic-class class"
    onClick={[Function]}
  >
    <div
      className="group"
      id="group-id"
    >
      <span>
        <strong>
          Hello!
        </strong>
      </span>
      <span
        className="empty"
      />
    </div>
  </div>
</BasicClass>
`;
```

And now here is the snapshot **with the `deep` mode**:

```js
it('converts basic class mount', () => {
  const mounted = mount(
    <BasicClass className="class">
      <strong>Hello!</strong>
    </BasicClass>,
  );

  expect(toJson(mounted, {mode: 'deep'})).toMatchSnapshot();
});

// snapshot =>

exports[`converts basic class mount`] = `
<div
  className="basic-class class"
  onClick={[Function]}
>
  <div
    className="group"
    id="group-id"
  >
    <span>
      <strong>
        Hello!
      </strong>
    </span>
    <span
      className="empty"
    />
  </div>
</div>
`;
```
