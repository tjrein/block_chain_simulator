import React, { Component } from 'react'
import { Button, Modal, TextArea, Form } from 'semantic-ui-react'

class AddBlockModal extends Component {
  state = {open: false, data: ""}
  close = () => this.setState({open: false, data: ""})
  open = () => this.setState({open: true});

  handleChange = e => {
    let data = e.target.value;
    this.setState({data: e.target.value})
  }

  submit = () => {
    this.props.addBlock(this.state.data);
    this.close();
  }

  render () {
    return (
      <div>
      <Button onClick={this.open}> Show Modal </Button>
      <Modal
        open={this.state.open}
        closeOnDimmerClick={false} >
        <Modal.Header> Add New Block </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.TextArea
                label="Data"
                placeholder="Data"
                value={this.state.data}
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}> Cancel </Button>
            <Button positive onClick={this.submit}> Submit </Button>
          </Modal.Actions>
       </Modal>
       </div>
    )
  }
}

export default AddBlockModal
