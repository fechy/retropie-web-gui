import { combineReducers } from 'redux';

import upload from './upload';
import list from './list';
import check from './check';
import stats from './stats';

export default combineReducers({
  upload,
  list,
  check,
  stats,
});
