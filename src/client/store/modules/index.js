import { combineReducers } from 'redux';
import timePicker from './timePicker';
import runner from './runner';

export default combineReducers({
  timePicker,
  runner,
});
