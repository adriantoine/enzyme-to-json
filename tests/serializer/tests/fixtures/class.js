import React, { Component } from 'react';
import { BasicPure } from './pure-function';

export class BasicClass extends Component {
    render() {
        return (
            <div className={`basic-class ${this.props.className}`} onClick={function handleOnClick() {}}>
                <div id="group-id" className="group">
                    <span>{this.props.children}</span>
                    <span className="empty"></span>
                </div>
            </div>
        );
    }
}

export class ClassWithPure extends Component {
    render() {
        return (
            <div className={`class-with-pure ${this.props.className}`} onClick={function handleOnClick() {}}>
                <BasicPure className="nested-pure">
                    <span>{this.props.children}</span>
                    <span className="empty"></span>
                </BasicPure>
            </div>
        );
    }
}

export class ClassWithDirectPure extends Component {
    render() {
        return (
            <BasicPure className="nested-pure">
                <span>{this.props.children}</span>
                <span className="empty"></span>
            </BasicPure>
        );
    }
}

export class ClassWithDirectComponent extends Component {
    render() {
        return (
            <ClassWithPure className="nested-pure">
                <span>{this.props.children}</span>
                <span className="empty"></span>
            </ClassWithPure>
        );
    }
}

export class ClassWithNull extends Component {
    render() {
        return null;
    }
}
