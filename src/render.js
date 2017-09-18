import range from 'lodash.range';
import isNil from 'lodash.isnil';
import {compact} from './utils';

const renderChildToJson = child => {
  if (isNil(child)) {
    return null;
  }

  if (child.type === 'tag') {
    return {
      type: child.name,
      props: child.attribs,
      children:
        child.children && child.children.length
          ? compact(child.children.map(renderChildToJson))
          : null,
      $$typeof: Symbol.for('react.test.json'),
    };
  } else if (child.type === 'text') {
    return child.data;
  }

  return null;
};

export default wrapper => {
  if (isNil(wrapper) || wrapper.length === 0) {
    return null;
  }

  return wrapper.length > 1
    ? range(0, wrapper.length).map(node => renderChildToJson(wrapper[node]))
    : renderChildToJson(wrapper[0]);
};
