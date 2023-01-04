import actionTypes from "../constants/actionTypes";
import utils from "../../Utils/functions";

export const careerTrackR = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CAREER_TRACK_STORE:
      return {
        ...state,
        ...action.value,
      };
    case actionTypes.CAREER_TRACK_BY_INDUSTRY:
      const { items = [] } = state;
      const industryObj = utils.convertArrayToObject(items, "id");
      const value = action.value || [];
      if (value.length) {
        industryObj[value[0].industry_id] = value;
      }
      return {
        ...state,
        items: utils.convertObjectToArray(industryObj),
      };
    default:
      return state;
  }
};
