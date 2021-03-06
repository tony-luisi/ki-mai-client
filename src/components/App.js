// @flow
import React, { Component } from 'react';
import ChatWindow from './ChatWindow'
import ChatInputForm from './ChatInputForm'
import InputCheck from './InputCheck'
import RoomsList from './RoomsList'
import logo from './logo.svg';
import { observer } from 'mobx-react'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <InputCheck />
        <RoomsList />
        <ChatInputForm />
        <ChatWindow />
      </div>
    );
  }
}

export default observer(App)
