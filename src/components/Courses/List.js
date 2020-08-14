import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Item from './Item';

const List = ({ courses }) => {
  const renderCourses = courses.map(course => (
    <Grid item xs={12} sm={6} lg={4} xl={3} key={course.id}>
      <Item course={course} />
    </Grid>
  ));

  return (
    <div className="App-list">
      <Grid container spacing={6}>
        {renderCourses}
      </Grid>
    </div>
  );
};

List.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
};

export default List;
