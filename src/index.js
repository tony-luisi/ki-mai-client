import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import './index.css';

useStrict(true)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
