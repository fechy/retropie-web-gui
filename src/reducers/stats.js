import { Record } from 'immutable';
import * as actions from '../constants';

import Disk from '../models/Disk';
import CPU from '../models/CPU';
import Memory from '../models/Memory';
import Temp from '../models/Temp';

const InitialState = Record({
  isChecking: false,
  disk: new Disk(),
  cpu: new CPU(),
  memory: new Memory(),
  temp: new Temp()
});

const initialState = new InitialState;

export default function reducer(state = initialState, action) {

  if (!(state instanceof InitialState)) return initialState;

  switch (action.type) {
    case actions.SYSTEM_STATS_LOADING: {
      return state.set('isChecking', true);
    }

    case actions.SYSTEM_STATS_SUCCESS: {
      return state.set('isChecking', false)
                  .set('disk', new Disk(action.payload.disk))
                  .set('cpu', new CPU(action.payload.cpu))
                  .set('memory', new Memory(action.payload.memory))
    }

    case actions.SYSTEM_TEMPERATURE_SUCCESS: {
      return state.set('temp', new Temp(action.payload))
    }
  }

  return state;
}
