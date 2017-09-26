import {isEnzymeWrapper} from './utils';
import toJson from './';

module.exports = {
  test(wrapper) {
    return isEnzymeWrapper(wrapper);
  },
  print(wrapper, serializer) {
    return serializer(toJson(wrapper));
  },
};
