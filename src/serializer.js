import ShallowWrapper from 'enzyme/build/ShallowWrapper';
import ReactWrapper from 'enzyme/build/ReactWrapper';

import toJson from './';

module.exports = {
    test(wrapper) {
        return wrapper instanceof ShallowWrapper || wrapper instanceof ReactWrapper || wrapper.cheerio;
    },
    print(wrapper) {
        return toJson(wrapper);
    },
};
