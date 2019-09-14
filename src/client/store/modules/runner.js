const TOGGLE_RUNNING = 'runner/TOGGLE_RUNNING';

export const toggleRunning = () => ({ type: TOGGLE_RUNNING });

const initialState = {
  isRunning: false,
};

export default function timePicker(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_RUNNING: 
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    default:
      return state;
  }
}