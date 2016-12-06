import ShallowWrapper from 'enzyme/build/ShallowWrapper';
import ReactWrapper from 'enzyme/build/ReactWrapper';

import shallowToJson from './shallow';
import mountToJson from './mount';
import renderToJson from './render';

export default function (wrapper) {
    if (wrapper instanceof ShallowWrapper) {
        return shallowToJson(wrapper);
    }

    if (wrapper instanceof ReactWrapper) {
        return mountToJson(wrapper);
    }

    if(wrapper.cheerio) {
        return renderToJson(wrapper);
    }
}

export {mountToJson, shallowToJson, renderToJson};
