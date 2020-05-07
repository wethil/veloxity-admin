import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import axios from 'axios';

import rootStore from './src/store/rootStore';
import App from './src/views/App.jsx';


axios.defaults.baseURL = 'http://localhost:5000';

const history = createBrowserHistory();

if (module.hot) {
  module.hot.accept();
}

(async () => {
  const initialState = {};
  const store = rootStore(initialState, history);

  const rootEl = document.getElementById('root');
  const render = (Component, el) => {
    ReactDOM.render(
      <Provider store={store}>
        <Component history={history} dispatch={store.dispatch} />
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);
