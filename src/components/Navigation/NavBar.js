import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { SearchContext } from '../../context/SearchContext';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    marginRight: 48,
    marginLeft: 48,
    width: '36ch',
  },
  searchIcon: {
    padding: '0px 16px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '8px 8px 8px 0px',
    paddingLeft: 'calc(1em + 32px)',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const [, setSearchString] = useContext(SearchContext);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            ReactJs / Material-UI / Contentful
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={event => setSearchString(event.target.value || '')}
            />
          </div>

          <>
            <Button color="inherit" component={RouterLink} to="/">
              List
            </Button>

            <Button color="inherit" component={RouterLink} to="/new/">
              Create
            </Button>

            <Button color="inherit" component={RouterLink} to="/about/">
              About
            </Button>
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
