import React, { Component } from 'react';
import {Form, Button, Container, Header} from 'semantic-ui-react';
import sha256 from 'crypto-js/sha256';

class Block extends Component {

  constructor(props) {
    super(props);
  }

  validHash = (hash, difficulty) => hash.substring(0, difficulty.length) === difficulty

  render () {
    const {data, hash, nonce, previous_hash, difficulty} = this.props;

    let hash_color = this.validHash(hash, difficulty) ? "green" : "red";
    let parent_color = this.validHash(previous_hash, difficulty) ? "green" : "red";

    return (
      <div>
        <Container text>
          <Header as="h4" color={parent_color}> Parent: {this.props.previous_hash} </Header>
          <Header as="h4" color={hash_color}> Hash: {this.props.hash} </Header>
          <Container>
          <Form size="small" error="true">
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
            <Button textAlign="center" circular size="big" onClick={this.props.mineBlock}>
              Mine
            </Button>
          </Form>
          </Container>
        </Container>
      </div>
    );
  }
}
export default Block;
