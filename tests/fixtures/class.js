import React, {Component} from 'react';
import {BasicPure} from './pure-function';

export class BasicClass extends Component {
  render() {
    return (
      <div
        className={`basic-class ${this.props.className}`}
        onClick={function handleOnClick() {}}
      >
        <div id="group-id" className="group">
          <span>{this.props.children}</span>
          <span className="empty" />
        </div>
      </div>
    );
  }
}

export class ClassWithPure extends Component {
  render() {
    return (
      <div
        className={`class-with-pure ${this.props.className}`}
        onClick={function handleOnClick() {}}
      >
        <BasicPure className="nested-pure">
          <span>{this.props.children}</span>
          <span className="empty" />
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
        <span className="empty" />
      </BasicPure>
    );
  }
}

export class ClassWithDirectComponent extends Component {
  render() {
    return (
      <ClassWithPure className="nested-pure">
        <span>{this.props.children}</span>
        <span className="empty" />
      </ClassWithPure>
    );
  }
}

export class ClassWithNull extends Component {
  render() {
    return null;
  }
}

export class ClassWithNullChildren extends Component {
  render() {
    return <div>{null}</div>;
  }
}

export class ClassWithState extends Component {
  constructor(props) {
    super(props);
    this.state = {showSpan: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({showSpan: true});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        {this.state.showSpan && <span>Updated</span>}
      </div>
    );
  }
}

export class ClassArrayRender extends Component {
  render() {
    return [
      <div className="test" key="test">
        Test
      </div>,
      <div className="test2" key="test2">
        Test 2
      </div>,
      <div className="child" key="child">
        {this.props.children}
      </div>,
    ];
  }
}
