import React from 'react';
import { HashRouter } from 'react-router-dom';
import NavBar from './components/Navigation/NavBar';
import Navigation from './components/Navigation';

const App = () => (
  <HashRouter>
    <NavBar />
    <Navigation />
  </HashRouter>
);

export default App;
