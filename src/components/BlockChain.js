import React, { Component } from 'react';
import Block from './Block';

class BlockChain extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Block />
        <Block />
      </div>
    )
  }
}

export default BlockChain;
