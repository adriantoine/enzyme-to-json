import React from 'react';

export function BasicPure(props) {
    return (
        <div className={`basic-pure ${props.className}`} onClick={function handleOnClick() {}}>
            <div id="group-id" className="group">
                <span>{props.children}</span>
                <span className="empty"></span>
            </div>
        </div>
    );
}

export function BasicWithUndefined(props) {
    return (
        <button disabled={props.disabled}>Hello</button>
    );
}

export function BasicWithAList() {
    return (
        <div>
            <ul>
                <li>0</li>
                <li>1</li>
            </ul>
        </div>
    );
}

export function ComponentWithAZeroChildren() {
    return <div>{0}</div>;
}
