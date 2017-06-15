import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import './ChatWindow.css';

class ChatWindow extends Component {

  state = {
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.store.chat.sendMessage('test', this.state.message)
    this.setState({ message: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Type here..." name="message" value={this.state.message} onChange={this.handleChange} /> 
        </form>
      </div>
    )
  }
}

export default inject('store')(observer(ChatWindow))