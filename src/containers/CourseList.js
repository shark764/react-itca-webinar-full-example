import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Grid, InputAdornment, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as contentful from 'contentful';
import CourseItem from '../components/CourseItem';

import { SPACE_ID, ACCESS_TOKEN } from '../utils';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchString, setSearchString] = useState('');

  const retrieveCourses = useCallback(() => {
    client
      .getEntries({
        content_type: 'course',
        'fields.title[match]': searchString,
      })
      .then(response => {
        /**
         * ---------------------------
         * Contentful structure:
         * ---------------------------
         * course = {
         *    fields: {
         *      title: string,
         *      url: string,
         *      shortDescription: string,
         *      description: string,
         *      duration: number,
         *      skillLevel: string,
         *      image: {
         *        fields: {
         *          file: {
         *            url: string,
         *          },
         *        },
         *      },
         *    },
         *    sys: {
         *      createdAt: string,
         *    },
         *  };
         *
         * ---------------------------
         * Desired structure:
         * ---------------------------
         * course = {
         *    title: string,
         *    url: string,
         *    shortDescription: string,
         *    description: string,
         *    duration: number,
         *    skillLevel: string,
         *    image: {
         *      id: string,
         *      title: string,
         *      url: string,
         *    },
         *    id: string,
         *    createdAt: string,
         *  };
         */
        const fetchedCourses = response.items.map(item => ({
          ...item.fields,
          image: {
            id: item.fields.image.sys.id,
            title: item.fields.image.fields.title,
            url: item.fields.image.fields.file.url,
          },
          id: item.sys.id,
          createdAt: item.sys.createdAt,
        }));
        setCourses(fetchedCourses);
        console.log(`%cCourses fetched using... "${searchString}":`, 'background: #ccc; color: #444;', response.items);
      })
      .catch(err => {
        console.error(err);
      });
  }, [searchString]);

  const onSearchStringInputChange = e => {
    setSearchString(e.target.value || '');
  };

  useEffect(() => {
    retrieveCourses();
  }, [searchString, retrieveCourses]);

  return (
    <div style={{ padding: 40 }}>
      <TextField
        style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 0, paddingRight: 0 }}
        placeholder="Search for courses..."
        margin="normal"
        onChange={onSearchStringInputChange}
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
          <Grid item xs={12} sm={6} lg={4} xl={3} key={course.id}>
            <CourseItem course={course} />
          </Grid>
        ))}
      </Grid>

      {!courses.length && (
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
};

export default CourseList;
