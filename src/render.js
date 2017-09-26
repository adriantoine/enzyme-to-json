import range from 'lodash/range';
import isNil from 'lodash/isNil';
import {compact, applyMap} from './utils';

const renderChildToJson = (child, options) => {
  if (isNil(child)) {
    return null;
  }

  if (child.type === 'tag') {
    return applyMap(
      {
        type: child.name,
        props: child.attribs,
        children: compact(
          child.children.map(c => renderChildToJson(c, options)),
        ),
        $$typeof: Symbol.for('react.test.json'),
      },
      options,
    );
  } else if (child.type === 'text') {
    return child.data;
  }

  return null;
};

const renderToJson = (wrapper, options = {}) => {
  if (isNil(wrapper) || wrapper.length === 0) {
    return null;
  }

  return wrapper.length > 1
    ? range(0, wrapper.length).map(node =>
        renderChildToJson(wrapper[node], options),
      )
    : renderChildToJson(wrapper[0], options);
};

export default renderToJson;
