import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react';
import sha256 from 'crypto-js/sha256';


class Block extends Component {
  state = {
    id: 1,
    parent: 1,
    data: "",
    hash: sha256("").toString()
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      data: value,
      hash: sha256(value).toString()
    });
  }

  render () {
    const {data, hash} = this.state;
    return (
      <div className="ui container">
        <h1>Block</h1>
        <Form size="big">
          <Form.TextArea
            label = "Data"
            placeholder = "Data"
            name = "data"
            value = {data}
            onChange={this.handleChange}
          />
        </Form>

        <p> {hash} </p>
      </div>
    );
  }
}
export default Block;
