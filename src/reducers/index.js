import { combineReducers } from 'redux';

import upload from './upload';
import list from './list';
import check from './check';

export default combineReducers({
  upload,
  list,
  check,
});
