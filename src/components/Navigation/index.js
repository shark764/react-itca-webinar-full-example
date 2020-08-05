import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainList from '../../containers/MainList';
import NewCourse from '../../containers/NewCourse';
import About from '../../containers/About';
import NotFound from './NotFound';

const Navigation = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" component={MainList} exact></Route>
          <Route path="/home" component={MainList} exact></Route>
          <Route path="/new" component={NewCourse} exact></Route>
          <Route path="/about" component={About} exact></Route>
          <Route component={NotFound}></Route>
          <Redirect to="/home/"></Redirect>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Navigation;
