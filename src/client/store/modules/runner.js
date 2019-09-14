const TOGGLE_RUNNING = 'runner/TOGGLE_RUNNING';
const SET_RUNNING = 'runner/SET_RUNNING';

export const toggleRunning = () => ({ type: TOGGLE_RUNNING });
export const setRunning = (isRunning) => ({ type: SET_RUNNING, isRunning });

const initialState = {
  isRunning: false,
};

export default function runner(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_RUNNING: 
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case SET_RUNNING: 
      return {
        ...state,
        isRunning: action.isRunning,
      };
    default:
      return state;
  }
}