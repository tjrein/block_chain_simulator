import React, { Component } from 'react';

class Block extends Component {
  state = {
    id: 1,
    parent: 1,
    data: 1,
    hash: "hello"
  };


  render () {
    const {data, hash} = this.state;
    return (
      <div className="ui container">
        <h1>Block</h1>
      </div>
    );
  }
}
export default Block;
