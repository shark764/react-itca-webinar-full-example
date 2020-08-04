import React, { Component } from 'react';
import { TextField, Grid, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CourseItem from '../components/CourseItem';

import * as contentful from 'contentful';

const SPACE_ID = 'srlpekq85luo';
const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

class MainList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      searchString: '',
    };
  }

  fetchCourses = () => {
    client
      .getEntries({
        content_type: 'course',
        'fields.title[match]': this.state.searchString,
      })
      .then(response => {
        this.setState({
          courses: response.items,
        });
        console.log('%ccourses fetched:', 'background: #ccc; color: #444;', response.items);
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.fetchCourses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchString !== this.state.searchString) {
      console.log('%csearching courses with:', 'background: #eee; color: #222;', this.state.searchString);
      this.fetchCourses();
    }
  }

  onChange = e => {
    const searchString = e.target.value || '';
    this.setState({
      searchString,
    });
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
          {this.state.courses.map(course => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={course.fields.slug}>
              <CourseItem course={course} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default MainList;
