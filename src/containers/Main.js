import React, { useState, useCallback, useEffect, useContext } from 'react';
import BaseList from './BaseList';
import { getEntries } from '../utils/contentful';

import { SearchContext } from '../context/SearchContext';

const Main = () => {
  const [courses, setCourses] = useState([]);
  const [searchString] = useContext(SearchContext);

  const retrieveCourses = useCallback(async () => {
    const entries = await getEntries({
      content_type: 'course',
      'fields.title[match]': searchString,
    });

    console.log(`%cCourses fetched using... "${searchString}":`, 'background: #ccc; color: #444;', entries);

    setCourses(entries);
  }, [searchString]);

  useEffect(() => {
    retrieveCourses();
  }, [retrieveCourses]);

  return (
    <div className="App-main">
      <BaseList courses={courses} />
    </div>
  );
};

export default Main;
