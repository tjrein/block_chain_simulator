import React, { Component } from 'react';
import sha256 from 'crypto-js/sha256';
import Block from './Block';
import { Button } from 'semantic-ui-react';

class BlockChain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chain: []
    }
  }

  componentDidMount() {
    this.loadBloackChain()
  }

  loadBloackChain = () => {
    fetch('api/blockchain')
      .then(data => data.json())
      .then(resp => this.setState({chain: resp.data}))
  }

   updateBlockchain = newState => {
     let blockchain = this.state.chain

     for (let block of blockchain) {
       if (newState.uuid === block.uuid) {
         block[newState.name] = newState.value;
         block.hash = sha256(block.data + block.nonce).toString();
       }
     }

     this.setState({chain: blockchain});
  }

  addBlock = () => {
    fetch('api/addblock')
      .then(data => data.json())
      .then(resp => this.setState({chain: resp.data}))
  }

  render () {

    const blocks = this.state.chain.map((block) =>
      <Block {...block} updateBlockchain={this.updateBlockchain} />
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
