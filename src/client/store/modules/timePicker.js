const ADD = 'timePicker/ADD';
const DELETE = 'timePicker/DELETE';
const TOGGLE_RUNNING = 'timePicker/TOGGLE_RUNNING';

export const toggleRunning = () => ({ type: TOGGLE_RUNNING });
export const addTime = time => ({ type: ADD, time });
export const deleteTime = index => ({ type: DELETE, index });

const initialState = {
  isRunning: false,
  times: [],
};

export default function timePicker(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_RUNNING: 
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case ADD:
      return {
        ...state,
        times: [...state.times, action.time],
      };
    case DELETE:
      const newTimes = [...state.times];
      newTimes.splice(action.index, 1);
      return {
        ...state,
        times: newTimes,
      };
    default:
      return state;
  }
}