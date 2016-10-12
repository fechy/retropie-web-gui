import {Record} from 'immutable';
import * as actions from '../constants';

const InitialState = Record({
  isFetching: false,
  list: [],
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
                  .set('error', null)
                  .set('list', []);
    }

    case actions.FETCH_LIST_SUCCESS:
    {
      return state.set('isFetching', false)
                  .set('error', action.payload.error || null)
                  .set('list', action.payload.list || []);
    }

    case actions.FETCH_LIST_ERROR:
    {
      return state.set('isFetching', false)
                  .set('error', action.payload.error || 'Server error')
                  .set('list', []);
    }
  }

  return state;
}

