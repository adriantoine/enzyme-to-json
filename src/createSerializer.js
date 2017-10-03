import {isEnzymeWrapper} from './utils';
import toJson from './';

export default function createSerializer(options) {
  return {
    test(wrapper) {
      return isEnzymeWrapper(wrapper);
    },
    print(wrapper, serializer) {
      return serializer(toJson(wrapper, options));
    },
  };
}
