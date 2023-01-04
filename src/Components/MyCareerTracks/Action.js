import actionTypes from "../../Redux/constants/actionTypes";
import industryApi from "../../Apis/industryApi";
import careerTrackApi from "../../Apis/careerTrackApi";
import skillCategoryApi from "../../Apis/skillCategoryApi";
import skillApi from "../../Apis/skillApi";
import vars from "../../Utils/vars";
import { toast } from "react-toastify";

const minLimit = vars.minLimit;
const updateStore = (value, actionType = actionTypes.MY_CAREER_TRACK) => {
  return (dispatch) => {
    dispatch({ type: actionType, value });
  };
};

const getCareerTrackByUser = (userId) => {
  return async (dispatch) => {
    try {
      let limit = minLimit;
      let result = [];
      while (true) {
        const data =
          (await careerTrackApi.getByUser({ user_id: userId }, limit)) || {};
        if (!data.last_evaluated_key) {
          result = data?.items || [];
          break;
        }
        limit += minLimit;
      }
      dispatch(updateStore({ trackList: result }));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteCareerTrack = async (id) => {
  try {
    await careerTrackApi.delete(id);
    toast.success("Create successfully!", vars.toastCss);
    return;
  } catch (error) {
    toast.error("Create error!", vars.toastCss);
    console.log(error);
  }
};

export { getCareerTrackByUser, deleteCareerTrack };
