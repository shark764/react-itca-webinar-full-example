import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import List from '../../components/Courses/List';

const BaseList = props => (
  <>
    <List courses={props.courses} />

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
  </>
);

BaseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
};

export default BaseList;
