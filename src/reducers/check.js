import {Record} from 'immutable';
import * as actions from '../constants';

const InitialState = Record({
  isChecking: true,
  isCheckingInvalids: false,
  invalidFiles: [],
  list: [],
});

const initialState = new InitialState;

export default function check(state = initialState, action) {
  if (typeof state == undefined) {
    return initialState;
  }

  switch (action.type) {
    case actions.CHECK_FOLDERS_LOADING:
    {
      return state.set('isChecking', true);
    }

    case actions.CHECK_FOLDERS_SUCCESS:
    {
      return state.set('isChecking', false)
                  .set('list', action.payload);
    }

    case actions.CHECK_INVALID_FILES_LOADING: {
      return state.set('invalidFiles', [])
        .set('isCheckingInvalids', true);
    }

    case actions.CHECK_INVALID_FILES_SUCCESS: {
      return state.set('invalidFiles', action.payload)
        .set('isCheckingInvalids', false);
    }
  }

  return state;
}
