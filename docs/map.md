# Output mapping feature

You can pass a function as the `map` option to have full control over your snapshot output. The function will traverse each node of your _wrapper_ tree recursively.

## Example

Use `map` to remove `containerInfo` prop from `Portal` components to avoid brittle snapshots.

```javascript
const removePortalContainerInfo = json => {
  if (json.type === "Portal") {
    return {
      ...json,
      props: {
        ...json.props,
        containerInfo: undefined
      }
    };
  }
  return json;
};

// Mount a component that might render a portal
const wrapper = mount(MyComponent);

// Then in your matcher

expect(
  toJson(wrapper, {
    mode: "deep",
    map: wrapper.exists("Portal") && removePortalContainerInfo
  })
).toMatchSpecificSnapshot(snapshotFilename);
```

Now these snapshots are solid. 

This example was extracted from a project using Material UI and the snapshot is actually a StoryShot. Before using the `map` function `containerInfo` was randomly set with body and spans apparently coming from Storybook markup.