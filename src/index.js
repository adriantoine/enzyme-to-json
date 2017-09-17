import {isShallowWrapper, isReactWrapper, isCheerioWrapper} from './utils';
import shallowToJson from './shallow';
import mountToJson, {mountToDeepJson, mountToShallowJson} from './mount';
import renderToJson from './render';

export default function(wrapper, options) {
  if (isShallowWrapper(wrapper)) {
    return shallowToJson(wrapper, options);
  }

  if (isReactWrapper(wrapper)) {
    return mountToJson(wrapper, options);
  }

  if (isCheerioWrapper(wrapper)) {
    return renderToJson(wrapper, options);
  }
}

export {
  mountToJson,
  mountToDeepJson,
  mountToShallowJson,
  shallowToJson,
  renderToJson,
};
