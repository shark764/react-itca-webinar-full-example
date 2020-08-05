import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CourseList from '../../containers/CourseList';
import CreateCourse from '../../containers/CreateCourse';
import About from '../../containers/About';
import NotFound from './NotFound';

const Navigation = () => (
  <Switch>
    <Route path="/" component={CourseList} exact />
    <Route path="/home" component={CourseList} exact />
    <Route path="/new" component={CreateCourse} exact />
    <Route path="/about" component={About} exact />

    <Route component={NotFound} />
    <Redirect to="/home/" />
  </Switch>
);

export default Navigation;
