export const storeRetrievedCourses = courses => ({
  type: 'app/MainApplication/STORE_RETRIEVED_COURSES',
  courses,
});

export const setSearchString = searchString => ({
  type: 'app/MainApplication/SET_SEARCH_STRING',
  searchString,
});
