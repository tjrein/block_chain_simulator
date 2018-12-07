import React, { Component } from 'react'
import { Button, Modal,  Form } from 'semantic-ui-react'

class FormModal extends Component {

  state = {data: ""}

  componentDidMount() {
    let initial_value = this.props.initial_value || "";
    this.setState((state, props) => ({
       data: initial_value
    }));
  }

  handleChange = e => this.setState({data: e.target.value})

  close = () => {
    this.setState({data: this.props.initial_value});
    this.props.closeCallback();
  }

  confirm = () => this.props.confirmCallback(this.state.data);

  render () {
    let name = this.props.name
    let input = '';

    if (name === "addBlock") {
      input = <Form.TextArea label="Data" placeholder="Data" value={this.state.data} onChange={this.handleChange}/>
    }

    if (name === "difficulty") {
      input = <Form.Input width={3} label="Difficulty" placeholder="difficulty" value={this.state.data} onChange={this.handleChange}/>
    }

    return (
      <div>
        <Modal open={this.props.open} closeOnDimmerClick={false} >
          <Modal.Header> Add New Block </Modal.Header>
          <Modal.Content>
            <Form>
              {input}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}> Cancel </Button>
            <Button positive onClick={this.confirm}> Submit </Button>
          </Modal.Actions>
         </Modal>
       </div>
    )
  }
}

export default FormModal;
