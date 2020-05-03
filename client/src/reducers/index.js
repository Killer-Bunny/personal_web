import { combineReducers } from 'redux';
import user from './user_reducer';
import placeHolders from './placeHolders_reducer';
import contact from './contact_reducer';

const rootReducer = combineReducers({
  placeHolders,
  user,
  contact
});

export default rootReducer;
