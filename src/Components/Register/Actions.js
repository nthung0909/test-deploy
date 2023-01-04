import userApi from "../../Apis/userApi";
import actionTypes from "../../Redux/constants/actionTypes";


const updateStore = (value, actionType = actionTypes.REGISTER) => {
  return (dispatch) => {
    dispatch({ type: actionType, value });
  };
};

const register = (params) => {
  return async (dispatch) => {
    let messageError = 'Register failed. Please try again';
    let registerSuccess = false;
    try {
      const result = await userApi.register(params);
        if (result) {
          const { email, detail } = result;

          if (email) {
              registerSuccess = true;
              messageError = 'Register successfully!'
          } 

          if(detail){
            messageError = detail;
          }
      }
    } catch (error) {
      if(error?.response?.data?.detail){
        messageError = error.response.data.detail;
      }
      console.log(error);
    }finally{
      dispatch(updateStore({registerSuccess, messageError}));
    }
  };
};


export { register };
