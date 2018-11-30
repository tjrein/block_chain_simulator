import React, { Component } from 'react';
import {Form, Button, Message} from 'semantic-ui-react';
import sha256 from 'crypto-js/sha256';

class Block extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const {data, hash, nonce, previous_hash} = this.props;

    return (
      <div className="ui container">
        <h3> Previous hash: {this.props.previous_hash} </h3>
        <h3> Hash: {this.props.hash} </h3>
        <Form size="big">
          <Form.TextArea
            label = "Data"
            placeholder = "Data"
            name = "data"
            value = {this.props.data}
            onChange={this.props.handleChange}
          />
          <Form.Input
            label = "Nonce"
            placeholder = "Nonce"
            name = "nonce"
            value = {this.props.nonce}
            onChange={this.props.handleChange}
          />
        </Form>
        <Button circular size="big" onClick={this.props.mineBlock}>
          Mine
        </Button>
      </div>
    );
  }
}
export default Block;
