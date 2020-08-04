import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Grid, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as contentful from 'contentful';
import CourseItem from '../components/CourseItem';

const SPACE_ID = 'srlpekq85luo';
const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const MainList = () => {
  const [courses, setCourses] = useState([]);
  const [searchString, setSearchString] = useState('');

  const fetchCourses = useCallback(() => {
    client
      .getEntries({
        content_type: 'course',
        'fields.title[match]': searchString,
      })
      .then(response => {
        setCourses(response.items);
        console.log(`%ccourses fetched using... "${searchString}":`, 'background: #ccc; color: #444;', response.items);
      })
      .catch(err => {
        console.error(err);
      });
  }, [searchString]);

  const onChange = e => {
    setSearchString(e.target.value || '');
  };

  useEffect(() => {
    fetchCourses();
  }, [searchString, fetchCourses]);

  return (
    <div style={{ padding: 40 }}>
      <TextField
        style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}
        placeholder="Search courses..."
        margin="normal"
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={10} style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={course.fields.slug}>
            <CourseItem course={course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MainList;
