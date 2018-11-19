import React, { Component } from 'react';
import sha256 from 'crypto-js/sha256';
import Block from './Block';
import { Button } from 'semantic-ui-react';

class BlockChain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chain: [{
        uuid: 1,
        parent: 0,
        hash: sha256("").toString(),
        data: '',
        nonce: 0
      }]
    }
  }

  addBlock = () => {
    const chain = this.state.chain
    const parent_block = chain[chain.length -1]
    let block = {
      id: parent_block.uuid + 1,
      parent: parent_block.uuid,
      hash: sha256("").toString(),
      data: '',
      nonce: 0
    }

    chain.push(block);

    this.setState({chain: chain});

  }

  render () {
    const blocks = this.state.chain.map((block) =>
      <Block {...block} />
    );


    return (
      <div>
        <div className="ui container">
          <Button size="big" onClick={this.addBlock}>
            Add Block
          </Button>
        </div>
        <div className="ui container">
          {blocks}
        </div>
      </div>
    )
  }
}

export default BlockChain;
