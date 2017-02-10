import {isShallowWrapper, isReactWrapper, isCheerioWrapper} from './utils';
import shallowToJson from './shallow';
import mountToJson from './mount';
import renderToJson from './render';

export default function(wrapper) {
  if (isShallowWrapper(wrapper)) {
    return shallowToJson(wrapper);
  }

  if (isReactWrapper(wrapper)) {
    return mountToJson(wrapper);
  }

  if (isCheerioWrapper(wrapper)) {
    return renderToJson(wrapper);
  }
}

export {mountToJson, shallowToJson, renderToJson};
