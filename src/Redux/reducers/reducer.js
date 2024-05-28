const initialState = {
    selectedCountry: 'Indian',
    loading: false
  };
  
  const countryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_COUNTRY':
        return {
          ...state,
          selectedCountry: action.payload
        };
      default:
        return state;
    }
  };
  
  export default countryReducer;