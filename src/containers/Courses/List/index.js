import React, { useState, useEffect, useCallback } from 'react';
import * as contentful from 'contentful';
import Layout from './layout';

import { SPACE_ID, ACCESS_TOKEN } from '../../../utils';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const List = () => {
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

  return <Layout courses={courses} onSearchStringInputChange={onSearchStringInputChange} />;
};

export default List;
