'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cheerioToJson = exports.mountToJson = undefined;
exports.shallowToJson = shallowToJson;

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.pickby');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.compact');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shallowToJson(wrapper) {
    if (!wrapper.type()) {
        return wrapper.node;
    }

    const children = (0, _lodash6.default)(wrapper.children().map(function (c) {
        return shallowToJson(c);
    }));
    const props = (0, _lodash4.default)(wrapper.props(), function (val) {
        return val !== undefined;
    });

    return {
        type: wrapper.name(),
        props: (0, _lodash2.default)(props, 'children'),
        children: children.length ? children : null,
        $$typeof: Symbol.for('react.test.json')
    };
}

exports.mountToJson = shallowToJson;


const cheerioChildToJson = function (child) {
    if (!child) return;

    if (child.type === 'tag') {
        return {
            type: child.name,
            props: child.attribs,
            children: child.children && child.children.length ? (0, _lodash6.default)(child.children.map(cheerioChildToJson)) : null,
            $$typeof: Symbol.for('react.test.json')
        };
    } else if (child.type === 'text') {
        return child.data;
    }
};
const cheerioToJson = exports.cheerioToJson = function (wrapper) {
    return cheerioChildToJson(wrapper.children()[0]);
};