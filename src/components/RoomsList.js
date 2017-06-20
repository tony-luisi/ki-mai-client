// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

class RoomList extends Component {
  render() {
    const {rooms} = this.props.store.chat
    return (
      <div>
          {rooms.map((message, i) => <p key={i} >{message}</p>)}
      </div>
    )
  }
}

export default inject('store')(observer(RoomList))