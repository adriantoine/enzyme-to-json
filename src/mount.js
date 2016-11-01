import compact from 'lodash.compact';
import omitBy from 'lodash.omitby';
import values from 'object-values';
import {isDOMComponent, isElement} from 'enzyme/build/react-compat';
import {internalInstance, propsOfNode} from 'enzyme/build/Utils';
import {typeName} from 'enzyme/build/Debug';
import {childrenOfNode} from 'enzyme/build/ShallowTraversal';

function instToJson(inst) {
    if (typeof inst === 'string' || typeof inst === 'number') return inst;
    if (!inst) return '';

    if (!inst.getPublicInstance) {
        const internal = internalInstance(inst);
        return instToJson(internal);
    }
    const publicInst = inst.getPublicInstance();

    if (typeof publicInst === 'string' || typeof publicInst === 'number') return publicInst;
    if (!publicInst && !inst._renderedComponent) return '';

    const currentElement = inst._currentElement;
    const type = typeName(currentElement);
    const props = omitBy(propsOfNode(currentElement), (val, key) => key === 'children' || val === undefined);
    const children = [];
    if (isDOMComponent(publicInst)) {
        const renderedChildren = inst._renderedChildren;
        if (!renderedChildren) {
            children.push(...childrenOfNode(currentElement));
        } else {
            children.push(...values(renderedChildren));
        }
    } else if (
        isElement(currentElement) &&
        typeof currentElement.type === 'function'
    ) {
        children.push(inst._renderedComponent);
    }

    const childrenArray = compact(children.map(n => instToJson(n)));

    return {
        type,
        props,
        children: childrenArray.length ? childrenArray : null,
        $$typeof: Symbol.for('react.test.json'),
    };
}

export function mountToJson(wrapper) {
    return instToJson(wrapper.node);
}
