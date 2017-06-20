// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

class InputCheck extends Component {
  render() {
    const {inputMessage} = this.props.store.chat.inputMessage
    return (
      <div>
        <p>{inputMessage}</p>
      </div>
    )
  }
}

export default inject('store')(observer(InputCheck))