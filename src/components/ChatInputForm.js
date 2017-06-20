// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import './ChatWindow.css';
import type { storeType } from '../types'

class ChatWindow extends Component {
  props: {
    store: storeType
  }

  handleSubmit = (e: Event) => {
    e.preventDefault()
    this.props.store.chat.sendMessage('test')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Type here..." name="message" value={this.props.store.chat.inputMessage.inputMessage} onChange={this.props.store.chat.handleInputMessageChange} /> 
        </form>
      </div>
    )
  }
}

export default inject('store')(observer(ChatWindow))