import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainList from '../../containers/MainList';
import NewCourse from '../../containers/NewCourse';
import About from '../../containers/About';
import NotFound from './NotFound';
import WhateverForm from '../../containers/WhateverForm';

const Navigation = () => (
  <Switch>
    <Route path="/" component={MainList} exact />
    <Route path="/home" component={MainList} exact />
    <Route path="/new" component={NewCourse} exact />
    <Route path="/about" component={About} exact />
    <Route path="/test" component={WhateverForm} exact />
    <Route component={NotFound} />
    <Redirect to="/home/" />
  </Switch>
);

export default Navigation;
