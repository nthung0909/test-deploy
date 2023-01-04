import userApi from "../../Apis/userApi";
import actionTypes from "../../Redux/constants/actionTypes";


const updateStore = (value, actionType = actionTypes.LOGIN) => {
  return (dispatch) => {
    dispatch({ type: actionType, value });
  };
};

const login = (params) => {
  return async (dispatch) => {
    let isLogin = false;
    let messageError;
    try {
        const result = await userApi.login(params);
        if (result) {
        const { access_token, detail } = result;
        if (access_token) {
            localStorage.setItem("access-token", access_token);
            isLogin = true;
        } else{
          messageError = detail || 'Login failed. Please try again'
        }
      }
    } catch (error) {
      messageError = 'Login failed. Please try again'
      console.log(error);
    }finally{
      dispatch(updateStore({isLogin, messageError}));
    }
  };
};

const checkToken = async () => {
  return userApi.testToken();
}

export { login, checkToken };
