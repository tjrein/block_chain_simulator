import React, { Component } from 'react';
import {Form, Button, Message} from 'semantic-ui-react';
import sha256 from 'crypto-js/sha256';

class Block extends Component {

  constructor(props) {
    super(props);

    this.state = {
      difficulty: "000",
      //id: 1,
      //parent: 0,
      //nonce: 0,
      //data: "",
      //hash: sha256("").toString()
    };
  }

  //handleClick = () => {
  //  const data = this.props.data;
  //  const difficulty = this.state.difficulty
  //  let nonce = this.props.nonce;
  //  let hash = this.props.hash

  //  while(hash.substring(0, difficulty.length) !== difficulty) {
  //    nonce++;
  //    hash = sha256(nonce + data).toString();
  //  }

//    this.setState({
  //    hash: hash,
  //    nonce: nonce
  //  });
//  }

  handleChange = e => {
    const {uuid, data} = this.props;
    const {value, name} = e.target;

    const newState = {
      uuid: uuid,
      data: data,
      value: value,
      name: name
    }

    this.props.updateBlockchain(newState);
  }

  render () {
    const {data, hash, nonce, previous_hash} = this.props;

    return (
      <div className="ui container">
        <h3> Previous hash: {previous_hash} </h3>
        <h3> Hash: {hash} </h3>
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
        <Button circular size="big">
          Mine
        </Button>
      </div>
    );
  }
}
export default Block;
