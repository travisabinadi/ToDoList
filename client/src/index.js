import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './resources/components/App'
import storeFactory from './resources/store/storeFactory'
import './resources/css/styles.css';

fetch("/store")
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then(res => {
    const serverStore = storeFactory(res);
    //Make so a post action is sent each store update
    serverStore.subscribe(() => {
      postData("/store", serverStore.getState())
      .catch(err => {console.log(err)});
    })
    render(
      <Provider store={serverStore}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
  })
  .catch(err => console.log(err));

// Example POST method implementation:
async function postData(url = '', data = {}) {
    await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
}



