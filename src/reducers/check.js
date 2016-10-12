import {Record} from 'immutable';
import * as actions from '../constants';

const InitialState = Record({
  isChecking: true,
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
  }

  return state;
}
