import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainList from '../../containers/MainList';
import About from '../../containers/About';
import NotFound from './NotFound';

const Navigation = () => (
  <Switch>
    <Route path="/" component={MainList} exact />
    <Route path="/home" component={MainList} exact />
    <Route path="/about" component={About} exact />
    <Route component={NotFound} />
    <Redirect to="/home/" />
  </Switch>
);

export default Navigation;
