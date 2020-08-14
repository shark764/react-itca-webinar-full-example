import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '../../containers/Main';
import Create from '../../containers/Create';
import About from '../../containers/About';
import NotFound from './NotFound';

const Navigation = () => (
  <Switch>
    <Route path="/" component={Main} exact />
    <Route path="/home" component={Main} exact />
    <Route path="/new" component={Create} exact />
    <Route path="/about" component={About} exact />

    <Route component={NotFound} />
    <Redirect to="/home/" />
  </Switch>
);

export default Navigation;
