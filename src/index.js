import omit from 'lodash.omit';
import pickBy from 'lodash.pickby';
import compact from 'lodash.compact';

export function shallowToJson(wrapper) {
    if (!wrapper.type()) {
        return wrapper.node;
    }

    const children = compact(wrapper.children().map(c => shallowToJson(c)));
    const props = pickBy(wrapper.props(), val => val !== undefined);

    return {
        type: wrapper.name(),
        props: omit(props, 'children'),
        children: (children.length) ? children : null,
        $$typeof: Symbol.for('react.test.json'),
    };
}

export {shallowToJson as mountToJson};

const renderChildToJson = child => {
    if(!child) return;

    if(child.type === 'tag') {
        return {
            type: child.name,
            props: child.attribs,
            children: child.children && child.children.length ? compact(child.children.map(renderChildToJson)) : null,
            $$typeof: Symbol.for('react.test.json'),
        };
    } else if(child.type === 'text') {
        return child.data;
    }
};
export const renderToJson = wrapper =>
    renderChildToJson(wrapper.children()[0]);
