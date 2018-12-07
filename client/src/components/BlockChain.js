import React, { Component } from 'react';
import FormModal from './FormModal';
import sha256 from 'crypto-js/sha256';
import Block from './Block';
import { Button, Container, Divider, Grid, Header } from 'semantic-ui-react';
import io from 'socket.io-client';
import update from 'immutability-helper';

class BlockChain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chain: [],
      difficulty: "000",
      addBlock_open: false,
      difficulty_open: false,
     }

    this.socket = io()

    this.socket.on('fetchBlockchain', (chain, difficulty) => {
      this.setState({chain:chain, difficulty:difficulty})
    })
  }

  handleChange = (index, e) => {
    let block = { ...this.state.chain[index] };
    let {name, value} = e.target;
    block[name] = value;
    block.hash = sha256(block.nonce + block.data + block.previous_hash).toString()
    this.updateBlocks(index, block);
  }

  mineBlock = (index, e) => {
    const difficulty = this.state.difficulty;

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
      newBlock.previous_hash = (parent_block && parent_block.hash) || null;
      newBlock.hash = sha256(newBlock.previous_hash + newBlock.data + newBlock.nonce).toString();
      newChain = update(newChain, { [i]: {$set: newBlock} });
    }

    this.setState({chain: newChain});
    this.socket.emit('updateBlockchain', newChain);
  }

  openModal = e => this.setState({[e.target.name]: true});

  closeModal = () => this.setState({addBlock_open: false, difficulty_open: false});

  updateDifficulty = (difficulty) => {
    this.closeModal();
    this.socket.emit('updateDifficulty', difficulty)
  }

  addBlock = (data) => {
    this.closeModal();
    this.socket.emit('addBlock', data);
  }

  render () {
    const blocks = this.state.chain.map((block, index) =>
      <Grid.Row columns={1}>
        <Block
          {...block}
          difficulty = {this.state.difficulty}
          handleChange={this.handleChange.bind(this, index)}
          mineBlock={this.mineBlock.bind(this, index)}
        />
        <Divider hidden />
      </Grid.Row>
    );

    return (
      <div>
      <Container>
        <Header as="h1" dividing> Blockchain Simulator </Header>
          <Button primary circular size="big" name="addBlock_open" onClick={this.openModal}> Add Block </Button>
          <Button primary circular size="big" name="difficulty_open" onClick={this.openModal}> Change Difficulty </Button>
          <Divider hidden />
       </Container>
        <Grid centered>
          {blocks}
        </Grid>
        <FormModal
          name="addBlock"
          open={this.state.addBlock_open}
          data={this.state.submit_data}
          closeCallback={this.closeModal}
          confirmCallback={this.addBlock}/>
        <FormModal
          name="difficulty"
          initial_value={this.state.difficulty}
          data={this.state.submit_data}
          open={this.state.difficulty_open}
          closeCallback={this.closeModal}
          confirmCallback={this.updateDifficulty}/>
      </div>
    )
  }
}

export default BlockChain;
