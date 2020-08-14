import React from 'react';
import { HashRouter } from 'react-router-dom';
import NavBar from './components/Navigation/NavBar';
import Navigation from './components/Navigation';
import SearchProvider from './context/SearchContext';
import './App.css';

const App = () => (
  <HashRouter>
    <SearchProvider>
      <NavBar />
      <Navigation />
    </SearchProvider>
  </HashRouter>
);

export default App;
