import {
  /* ERRORS */
  ERROR_SHOW,
  ERROR_HIDE,
  /* USER */
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../actionTypes'

/* ERRORS */
export function errorShow(text) {
  return {
    type: ERROR_SHOW,
    payload: {
      isError: true,
      errMessage: text
    }
  }
}

export function errorHide() {
  return {
    type: ERROR_HIDE,
    payload: {
      isError: false,
      errMessage: ''
    }
  }
}

/* USER */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
    payload: {
      isLoading: true
    }
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isLoading: false,
      isAuthorized: true,
      user
    }
  }
}

export function loginError() {
  return {
    type: LOGIN_ERROR,
    payload: {
      isLoading: false
    }
  }
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    payload: {
      isLoading: true
    }
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      isLoading: false,
      isAuthorized: false
    }
  }
}

export function logoutError() {
  return {
    type: LOGOUT_ERROR,
    payload: {
      isLoading: false
    }
  }
}