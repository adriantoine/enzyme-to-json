import {isShallowWrapper, isReactWrapper, isCheerioWrapper} from './utils';
import shallowToJson from './shallow';
import mountToJson, {mountToDeepJson, mountToShallowJson} from './mount';
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

export {
  mountToJson,
  mountToDeepJson,
  mountToShallowJson,
  shallowToJson,
  renderToJson,
};
