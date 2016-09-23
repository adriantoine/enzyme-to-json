import omit from 'lodash.omit';
import pickBy from 'lodash.pickby';
import compact from 'lodash.compact';
import get from 'lodash.get';

export function shallowToJson(wrapper) {
    const type = wrapper.type();
    if (!type) {
        return wrapper.node;
    }

    const children = compact(wrapper.children().map(c => shallowToJson(c)));
    const props = pickBy(wrapper.props(), val => val !== undefined);

    const json = {
        type: wrapper.name(),
        props: omit(props, 'children'),
        children: (children.length) ? children : null,
        $$typeof: Symbol.for('react.test.json'),
    };

    // If the type of element is not a function, it means that is a DOM element
    if (typeof type !== 'function') {
        return json;
    }

    // We need to get the rendered component in Enzyme internals
    // because it won't be returned by `.children()`
    const element = get(wrapper, 'node._reactInternalInstance._renderedComponent._currentElement');
    if(!element) {
        return json;
    }

    const jsonChildren = json.children;
    json.children = [{
        type: element.type,
        props: omit(element.props, 'children'),
        children: jsonChildren,
        $$typeof: Symbol.for('react.test.json'),
    }];

    return json;
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
