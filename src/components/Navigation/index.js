import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import List from '../../containers/Courses/List';
import Create from '../../containers/Courses/Create';
import About from '../../containers/About';
import NotFound from './NotFound';

const Navigation = () => (
  <Switch>
    <Route path="/" component={List} exact />
    <Route path="/home" component={List} exact />
    <Route path="/new" component={Create} exact />
    <Route path="/about" component={About} exact />

    <Route component={NotFound} />
    <Redirect to="/home/" />
  </Switch>
);

export default Navigation;
