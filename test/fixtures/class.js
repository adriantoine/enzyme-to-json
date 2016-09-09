import React, { Component } from 'react';

export class BasicClass extends Component {
    render() {
        return (
            <div className={this.props.className} onClick={function handleOnClick() {}}>
                <div id="group-id" className="group">
                    <span>{this.props.children}</span>
                    <span className="empty"></span>
                </div>
            </div>
        );
    }
}
