import { combineReducers } from 'redux';
import counter from './counter';
import timePicker from './timePicker';

export default combineReducers({
  counter,
  timePicker,
});