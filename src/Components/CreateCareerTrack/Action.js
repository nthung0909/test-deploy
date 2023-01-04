import actionTypes from "../../Redux/constants/actionTypes";
import industryApi from "../../Apis/industryApi";
import careerTrackApi from "../../Apis/careerTrackApi";
import skillCategoryApi from "../../Apis/skillCategoryApi";
import skillApi from "../../Apis/skillApi";
import vars from "../../Utils/vars";
import { toast } from "react-toastify";

const minLimit = vars.minLimit;
const updateStore = (value, actionType = actionTypes.CREATE_NEW_TRACK) => {
  return (dispatch) => {
    dispatch({ type: actionType, value });
  };
};

const getAllIndustry = () => {
  return async (dispatch) => {
    try {
      let limit = minLimit;
      let result = [];
      while (true) {
        let data = (await industryApi.getIndustries({ limit })) || {};
        if (!data.last_evaluated_key) {
          result = data?.items || [];
          break;
        }
        limit += minLimit;
      }
      dispatch(updateStore({ industries: result }));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};

const getIndustryById = (industry_id) => {
  return async (dispatch) => {
    try {
      const result = await industryApi.getIndustryById(industry_id);
      return result || {};
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllTrackByIndustry = (industry_id) => {
  return async (dispatch) => {
    try {
      const limit = minLimit;
      let result = [];
      while (true) {
        const data =
          (await careerTrackApi.getByIndustry({ limit, industry_id })) || {};
        if (!data.last_evaluated_key) {
          result = data?.items || [];
          break;
        }
        limit += minLimit;
      }
      dispatch(updateStore({ tracksByIndustry: result }));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllSkillCategory = () => {
  return async (dispatch) => {
    try {
      let limit = minLimit;
      let result = [];
      while (true) {
        let data = (await skillCategoryApi.get({ limit })) || {};
        if (!data.last_evaluated_key) {
          result = data?.items || [];
          break;
        }
        limit += minLimit;
      }
      dispatch(updateStore({ skillCategories: result }));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllSkill = () => {
  return async (dispatch) => {
    try {
      let limit = minLimit;
      let result = [];
      while (true) {
        const data = (await skillApi.getSkills({ limit })) || {};
        if (!data.last_evaluated_key) {
          result = data?.items || [];
          break;
        }
        limit += minLimit;
      }
      dispatch(updateStore({ skills: result }));
      return result;
    } catch (e) {
      console.log(e);
    }
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
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};

const getCareerTrack = (id) => {
  try {
    return careerTrackApi.getById({career_track_id: id});
  } catch (e) {
    console.log(e);
  }
}

const createCareerTrack = (params) => {
  return async (dispatch) => {
    try {
      await careerTrackApi.create(params);
      toast.success("Create successfully!", vars.toastCss);
    } catch (e) {
      console.log(e);
      toast.error("Create error!", vars.toastCss);
    }
  };
};

const updateCareerTrack = (params) => {
  return async (dispatch) => {
    try {
      await careerTrackApi.update(params);
      toast.success("Update successfully!", vars.toastCss);
      return true;
    } catch (e) {
      console.log(e);
      toast.error("Update error!", vars.toastCss);
      return false;
    }
  };
};

export {
  getAllIndustry,
  getIndustryById,
  getAllSkillCategory,
  getAllTrackByIndustry,
  getAllSkill,
  createCareerTrack,
  getCareerTrackByUser,
  updateCareerTrack,
  getCareerTrack,
};
