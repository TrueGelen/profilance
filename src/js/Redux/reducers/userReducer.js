import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../actionTypes'

export const initialState = {
  isLoading: false,
  isAuthorized: false,
  user: {}
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, ...action.payload }
      break
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload }
      break
    default:
      return state
      break;
  }
}