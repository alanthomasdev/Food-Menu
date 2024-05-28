import { combineReducers } from 'redux';
import countryReducer from './reducer';

const rootReducer = combineReducers({
  country: countryReducer
});

export default rootReducer;
