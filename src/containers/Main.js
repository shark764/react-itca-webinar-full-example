import React, { Component } from 'react';
import RenderA from '../components/RenderA';
import RenderB from '../components/RenderB';
import RenderC from '../components/RenderC';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueA: 'This is component A',
    };
  }

  onChange = e => {
    this.setState({
      valueA: e.target.value,
    });
  };

  render() {
    return (
      <div style={{ display: 'flex', margin: 50 }}>
        <RenderA valueA={this.state.valueA} />
        <RenderB />
        <RenderC onChange={this.onChange} />
      </div>
    );
  }
}

export default Main;
