import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import App from './App';
import Login from './components/Login';
import isAuthenticated from './hoc/Authentication';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={isAuthenticated(Login)} />
      <Route path="/home" component={isAuthenticated(App)} />
    </Switch>
  </BrowserRouter>
);

export default Router;
