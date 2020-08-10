import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, InputAdornment, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CourseItem from '../../../components/Courses/Item';

const Layout = props => (
  <div style={{ padding: 40 }}>
    <TextField
      style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}
      placeholder="Search for courses..."
      margin="normal"
      onChange={props.onSearchStringInputChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />

    <Grid container spacing={10} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
      {props.courses.map(course => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={course.id}>
          <CourseItem course={course} />
        </Grid>
      ))}
    </Grid>

    {!props.courses.length && (
      <Grid
        container
        spacing={10}
        style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <CircularProgress size={50} />
        </Grid>
      </Grid>
    )}
  </div>
);

Layout.propTypes = {
  onSearchStringInputChange: PropTypes.func,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
};

export default Layout;
