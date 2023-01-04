import actionTypes from "../constants/actionTypes";

export const myCareerTrackR = (state = {}, action) => {
  const { value } = action;
  switch (action.type) {
    case actionTypes.MY_CAREER_TRACK:
      return {
        ...state,
        ...value,
      };
    default:
      return state;
  }
};
