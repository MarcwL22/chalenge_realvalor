import React from 'react';
import { render } from 'react-dom';
import './index.css';
// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Route, BrowserRouter as Router } from 'react-router-dom';
// Pages
import HomePage from './HomePage';
// Reducers
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path={'/'} component={HomePage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
