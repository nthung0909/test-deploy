import actionTypes from "../../Redux/constants/actionTypes";

export const userR = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        ...action.value
      }
    case actionTypes.REGISTER:
      return {
        ...state,
        ...action.value
      }
    case actionTypes.SET_INFO:
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}
