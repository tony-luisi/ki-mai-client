// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import './index.css';
import spellcheck from './utils/spelling'

console.log(spellcheck('a'))
console.log(spellcheck('kia'))

useStrict(true)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
