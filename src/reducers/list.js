import {Record} from 'immutable';
import * as actions from '../constants';

const InitialState = Record({
  isFetching: false,
  isDeleting: false,
  list: [],
  available: false,
  error: null,
});

const initialState = new InitialState;

export default function list(state = initialState, action) {

  if (!(state instanceof InitialState)) return initialState;

  switch (action.type)
  {
    case actions.FETCH_LIST_LOADING:
    {
      return state.set('isFetching', true)
                  .set('available', false)
                  .set('error', null)
                  .set('list', []);
    }

    case actions.FETCH_LIST_SUCCESS:
    {
      return state.set('isFetching', false)
                  .set('available', action.payload.available)
                  .set('error', action.payload.error || null)
                  .set('list', action.payload.fileList || []);
    }

    case actions.FETCH_LIST_ERROR:
    {
      return state.set('isFetching', false)
                  .set('available', false)
                  .set('error', action.payload.error || 'Server error')
                  .set('list', []);
    }

    case actions.DELETE_FILE_LOADING: {
      return state.set('isDeleting', true)
                  .set('error', null)
    }

    case actions.DELETE_FILE_SUCCESS: {
      return state.set('isDeleting', false)
                  .set('error', action.payload.error);
    }

    case actions.DELETE_FILE_ERROR: {
      return state.set('isDeleting', false)
                  .set('error', action.payload.error || 'Server error');
    }
  }

  return state;
}

