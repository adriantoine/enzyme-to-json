import React from 'react';

export function BasicPure(props) {
    return (
        <div className={props.className} onClick={function handleOnClick() {}}>
            <div id="group-id" className="group">
                <span>{props.children}</span>
                <span className="empty"></span>
            </div>
        </div>
    );
}
