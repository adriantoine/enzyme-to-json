import {isEnzymeWrapper} from './build/utils';
import toJson from './';

module.exports = {
    test(wrapper) {
        return isEnzymeWrapper(wrapper);
    },
    print(wrapper, serializer) {
        return serializer(toJson(wrapper));
    },
};
