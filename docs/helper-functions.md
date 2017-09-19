# Use individual helper functions

In addition to the `toJson` helper that is recommended you can use individual helpers for each type of Enzyme wrapper.

You can pass an options object to them, just like you do with the `toJson` helper.

## shallowToJson

```js
import {shallowToJson} from 'enzyme-to-json';

// or

import shallowToJson from 'enzyme-to-json/shallow';

it('converts shallow wrappers', () => {
  const wrapper = shallow(<div>Hello</div>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
```

## mountToJson

```js
import {mountToJson} from 'enzyme-to-json';

// or

import mountToJson from 'enzyme-to-json/mount';

it('converts mount wrappers', () => {
  const wrapper = mount(<div>Hello</div>);
  expect(mountToJson(wrapper)).toMatchSnapshot();
});
```

## renderToJson

```js
import {renderToJson} from 'enzyme-to-json';

// or

import renderToJson from 'enzyme-to-json/render';

it('converts render wrappers', () => {
  const wrapper = render(<div>Hello</div>);
  expect(renderToJson(wrapper)).toMatchSnapshot();
});
```
