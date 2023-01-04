import actionTypes from "../../Redux/constants/actionTypes";
import industryApi from "../../Apis/industryApi";
import careerTrackApi from "../../Apis/careerTrackApi";
const updateStore = (value, actionType = actionTypes.CAREER_TRACK_STORE) => {
  return (dispatch) => {
    dispatch({ type: actionType, value });
  };
};

const getIndustries = (params) => {
  return async (dispatch) => {
    try {
      const result = await industryApi.getIndustries(params);
      let data = result;
      data.items = data.items.map(item => { item.careerTracks = []; return item; });
      dispatch(updateStore(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getCareerByIndustry = (industry_id) => {
  return async (dispatch) => {
    try {
      const result = await careerTrackApi.getByIndustry({ industry_id });
      const data = result?.items || [];
      dispatch(updateStore(data, actionTypes.CAREER_TRACK_BY_INDUSTRY));
    } catch (error) {
      console.log(error);
    }
  };
};

export { getIndustries, getCareerByIndustry };
