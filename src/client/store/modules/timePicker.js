const ADD = 'timePicker/ADD';
const DELETE = 'timePicker/DELETE';

export const addTime = time => ({ type: ADD, time });
export const deleteTime = index => ({ type: DELETE, index });

const initialState = {
  times: [],
};

export default function timePicker(state = initialState, action) {
  switch (action.type) {
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