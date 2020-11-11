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
  user: {
    id: null,
    firstName: null,
    secondName: null,
    email: null,
    role: null
  }
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, ...action.payload }
      break
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload }
      break
    case LOGIN_ERROR:
      return { ...state, ...action.payload }
      break
    case LOGOUT_REQUEST:
      return { ...state, ...action.payload }
      break
    case LOGOUT_SUCCESS:
      return { ...state, ...action.payload }
      break
    case LOGOUT_ERROR:
      return { ...state, ...action.payload }
      break
    default:
      return state
      break;
  }
}