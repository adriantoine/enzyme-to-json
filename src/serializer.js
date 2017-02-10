import {isEnzymeWrapper} from './build/utils'; // eslint-disable-line import/no-unresolved
import toJson from './';

module.exports = {
  test(wrapper) {
    return isEnzymeWrapper(wrapper);
  },
  print(wrapper, serializer) {
    return serializer(toJson(wrapper));
  },
};
