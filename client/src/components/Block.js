import React, { Component } from 'react';
import { Form, Button, Container, Header, Segment } from 'semantic-ui-react';

class Block extends Component {

  validHash = (hash, difficulty) => hash.substring(0, difficulty.length) === difficulty

  render () {
    const {hash, previous_hash, difficulty} = this.props;
    let hash_color = this.validHash(hash, difficulty) ? "green" : "red";
    let parent_color = this.validHash(previous_hash, difficulty) ? "green" : "red";
    let status = hash_color === "green" && parent_color === "green" ? "green" : "red";

    return (
      <div>
        <Segment compact color={status}>
          <Container text>
            <Header as="h4" color={parent_color}> Parent: {this.props.previous_hash} </Header>
            <Header as="h4" color={hash_color}> Hash: {this.props.hash} </Header>
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
        </Segment>
      </div>
    );
  }
}
export default Block;
