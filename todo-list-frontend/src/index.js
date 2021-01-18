import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './resources/components/App'
import storeFactory from './resources/store/storeFactory'
import './resources/css/styles.css';

const store = storeFactory();

render(
 <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

