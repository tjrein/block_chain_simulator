import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react';
import sha256 from 'crypto-js/sha256';

class Block extends Component {

  constructor(props) {
    super(props);
    this.state = {
      difficulty: 4,
      id: 1,
      parent: 1,
      nonce: 0,
      data: "",
      hash: sha256("").toString()
    };
  }

  handleClick = () => {
    const data = this.state.data;
    const difficulty = this.state.difficulty
    let nonce = 0;
    let hash = this.state.hash

    console.log(hash.substring(0, this.state.difficulty))

    while(hash.substring(0, difficulty) !== '0000') {
      nonce++;
      hash = sha256(nonce + data).toString();
    }

    this.setState({
      hash: hash,
      nonce: nonce
    });
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    const nonce = this.state.nonce;

    this.setState({
      [name]: value,
      hash: sha256(nonce + value).toString()
    });
  }

  render () {
    const {data, hash, nonce} = this.state;

    return (
      <div className="ui container">
        <h1>Block: {hash} </h1>
        <Form size="big">
          <Form.TextArea
            label = "Data"
            placeholder = "Data"
            name = "data"
            value = {data}
            onChange={this.handleChange}
          />
          <Form.Input
            label = "Nonce"
            placeholder = "Nonce"
            name = "nonce"
            value = {nonce}
            onChange={this.handleChange}
          />
        </Form>

        <Button circular size="big" onClick={this.handleClick}>
          Mine
        </Button>

      </div>
    );
  }
}
export default Block;
