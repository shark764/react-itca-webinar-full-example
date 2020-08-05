import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        ReactJs / Material-UI / Contentful
      </Typography>

      <Router>
        <div style={{ marginLeft: 24 }}>
          <Button color="inherit" component={RouterLink} to="/">
            List
          </Button>

          <Button color="inherit" component={RouterLink} to="/new/">
            Create
          </Button>
        </div>
      </Router>
    </Toolbar>
  </AppBar>
);

export default NavBar;
