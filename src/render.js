import range from 'lodash.range';
import {compact} from './utils';

const renderChildToJson = child => {
  if (!child) {
    return null;
  }

  if (child.type === 'root') {
    return renderChildToJson(child.children[0]);
  } else if (child.type === 'tag') {
    return {
      type: child.name,
      props: child.attribs,
      children: child.children && child.children.length
        ? compact(child.children.map(renderChildToJson))
        : null,
      $$typeof: Symbol.for('react.test.json'),
    };
  } else if (child.type === 'text') {
    return child.data;
  }
};

export default wrapper => {
  return wrapper.length > 1
    ? range(0, wrapper.length).map(node => renderChildToJson(wrapper[node]))
    : renderChildToJson(wrapper[0]);
};
