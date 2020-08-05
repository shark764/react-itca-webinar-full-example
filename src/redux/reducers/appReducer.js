const initialState = {
  courses: [],
  searchString: '',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'app/MainApplication/STORE_RETRIEVED_COURSES': {
      return { ...state, courses: action.courses };
    }

    case 'app/MainApplication/SET_SEARCH_STRING': {
      return { ...state, searchString: action.searchString };
    }

    default:
      return state;
  }
};

export default appReducer;
