import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Grid, InputAdornment, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as contentful from 'contentful';
import CourseItem from '../components/CourseItem';
import { storeRetrievedCourses, setSearchString } from '../redux/actions';

const SPACE_ID = 'srlpekq85luo';
const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

class MainList extends Component {
  fetchCourses = () => {
    client
      .getEntries({
        content_type: 'course',
        'fields.title[match]': this.props.searchString,
      })
      .then(response => {
        this.props.storeRetrievedCourses(response.items);
        console.log('%ccourses fetched:', 'background: #ccc; color: #444;', response.items);
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.fetchCourses();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchString !== this.props.searchString) {
      console.log('%csearching courses with:', 'background: #eee; color: #222;', this.props.searchString);
      this.fetchCourses();
    }
  }

  onChange = e => {
    const searchString = e.target.value || '';
    this.props.setSearchString(searchString);
  };

  render() {
    return (
      <div style={{ padding: 40 }}>
        <TextField
          style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}
          placeholder="Search courses..."
          margin="normal"
          onChange={this.onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={10} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
          {this.props.courses.map(course => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={course.fields.slug}>
              <CourseItem course={course} />
            </Grid>
          ))}
        </Grid>

        {!this.props.courses.length && (
          <Grid
            container
            spacing={10}
            style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}
            alignContent="center"
            alignItems="center"
            justify="center">
            <Grid item>
              <CircularProgress size={50} />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.app.courses,
  searchString: state.app.searchString,
});

const actions = {
  storeRetrievedCourses,
  setSearchString,
};

export default connect(mapStateToProps, actions)(MainList);
