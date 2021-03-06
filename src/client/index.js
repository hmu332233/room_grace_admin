import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/modules';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

import Main from './pages/Main';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
