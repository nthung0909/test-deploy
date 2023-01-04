import userApi from "../../Apis/userApi";
import actionTypes from "../../Redux/constants/actionTypes";


const updateStore = (value, actionType = actionTypes.SET_INFO) => {
  return (dispatch) => {
    dispatch({ type: actionType, value });
  };
};

const userBio = () => {
  return async (dispatch) => {
    try {
        const result = await userApi.getCurrentUser();
        if (result) {
        const userProfile = result; 

        dispatch(updateStore({userProfile}));
        return userProfile;
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export { userBio };
