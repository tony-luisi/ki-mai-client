import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import './ChatWindow.css';

class ChatWindow extends Component {
  render() {
    const {messages} = this.props.store.chat
    return (
      <div>
          {messages.map((message, i) => <p key={i} >{message}</p>)}
      </div>
    )
  }
}

export default inject('store')(observer(ChatWindow))