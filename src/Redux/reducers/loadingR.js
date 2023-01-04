import actionTypes from '../constants/actionTypes'

export const loadingR = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return { status: true }
    case actionTypes.LOADING_STOP:
      return { status: false }
    default:
      return { status: false }
  }
}
