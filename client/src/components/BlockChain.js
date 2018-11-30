import React, { Component } from 'react';
import sha256 from 'crypto-js/sha256';
import Block from './Block';
import { Button } from 'semantic-ui-react';
import io from 'socket.io-client';
import update from 'immutability-helper';

class BlockChain extends Component {
  constructor(props) {
    super(props)
    this.state = { chain: [] }
    this.socket = io()
  }

  componentDidMount() {
    this.loadBloackChain();
    this.socket.on('updateBlockchain', chain => this.setState({chain: chain}));
  }

  loadBloackChain = () => {
    fetch('api/blockchain')
      .then(data => data.json())
      .then(resp => this.setState({chain: resp.data}))
  }

  handleChange = (index, e) => {
    let block = { ...this.state.chain[index] };
    let {name, value} = e.target;
    block[name] = value;
    block.hash = sha256(block.nonce + block.data + block.previous_hash).toString()
    this.updateBlocks(index, block);
  }

  mineBlock = (index, e) => {
    const difficulty = "000"

    let block = { ...this.state.chain[index] };
    let { data, nonce, hash, previous_hash } = block

    while(hash.substring(0, difficulty.length) !== difficulty) {
      nonce++;
      hash = sha256(nonce + data + previous_hash).toString();
    }

    block.nonce = nonce;
    block.hash = hash
    this.updateBlocks(index, block);
  }

  updateBlocks = (index, block)  => {
    let newChain = update(this.state.chain, { [index]: { $set: block } });

    for (let i = index + 1; i < newChain.length; i++) {
      let newBlock = {...newChain[i]};
      let parent_block = {...newChain[i-1]} || null
      newBlock.previous_hash = parent_block && parent_block.hash || null;
      newBlock.hash = sha256(newBlock.previous_hash + newBlock.data + newBlock.nonce).toString();
      newChain = update(newChain, { [i]: {$set: newBlock} });
    }

    this.setState({chain: newChain});
    this.socket.emit('updateBlockchain', newChain);
  }

  addBlock = () => {
    fetch('api/addblock')
      .then(data => data.json())
      .then(resp => this.setState({chain: resp.data}))
  }

  render () {
    const blocks = this.state.chain.map((block, index) =>
      <Block
        {...block}
        handleChange={this.handleChange.bind(this, index)}
        mineBlock={this.mineBlock.bind(this, index)}
      />
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
