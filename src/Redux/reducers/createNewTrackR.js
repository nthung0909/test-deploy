import actionTypes from "../constants/actionTypes";

export const createNewTrackR = (state = {}, action) => {
  const {value} = action;
  switch (action.type) {
    case actionTypes.CREATE_NEW_TRACK:
      return {
        ...state,
        ...value,
      };
    default:
      return state;
  }
};
