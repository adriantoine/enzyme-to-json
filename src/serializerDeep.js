import {isEnzymeWrapper} from './utils';
import toJson from './';

export function test(wrapper) {
  return isEnzymeWrapper(wrapper);
}

export function print(wrapper, serializer) {
  return serializer(toJson(wrapper, {mode: 'deep'}));
}
