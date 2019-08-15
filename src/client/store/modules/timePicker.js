const ADD = 'timePicker/ADD';
const DELETE = 'timePicker/DELETE';
const TOGGLE_RUNNING = 'timePicker/TOGGLE_RUNNING';

export const toggleRunning = () => ({ type: TOGGLE_RUNNING });
export const addTime = time => ({ type: ADD, time });
export const deleteTime = time => ({ type: DELETE, time });

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
      return {
        ...state,
        times: state.times.filter(time => time !== action.time),
      };
    default:
      return state;
  }
}