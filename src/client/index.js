import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { observable, computed, action, reaction } from "mobx";
import Home from './components/Home/Home';
import Page404 from './components/page404';
import './index.css';

import ListStore from './stores/ListStore.js'

let store = new ListStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div class='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={Page404} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);

window.store = store;
