import compact from 'lodash.compact';

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

export default wrapper => renderChildToJson(wrapper.children()[0]);
