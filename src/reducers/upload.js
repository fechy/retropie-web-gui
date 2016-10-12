import {Record} from 'immutable';
import * as actions from '../constants';

const InitialState = Record({
  isUploading: false,
  error: null,
});

const initialState = new InitialState;

export default function runtime(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState;

  switch (action.type) {
    case actions.UPLOAD_LOADING:
    {
      return state.set('isUploading', true)
                  .set('error', null);
    }

    case actions.UPLOAD_SUCCESS:
    {
      return state.set('isUploading', false)
                  .set('error', action.payload.error || null);
    }

    case actions.UPLOAD_ERROR:
    {
      return state.set('isUploading', false)
                  .set('error', action.payload.error || 'Server error');
    }

    default:
      return state;
  }
}
