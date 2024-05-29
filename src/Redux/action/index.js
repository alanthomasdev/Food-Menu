export const selectCountry = (country) => {
  return {
    type: 'SELECT_COUNTRY',
    payload: country
  };
};
