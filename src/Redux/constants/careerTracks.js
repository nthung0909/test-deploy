import actionTypes from "../../Redux/constants/actionTypes";

export const careerTrackA = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CAREER_TRACK_STORE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
