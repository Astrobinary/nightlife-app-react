import 'isomorphic-fetch';
import $ from 'jquery';
import { parseJSON } from '../utils/utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
	user: null,
  };
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    user: null,
    error,
  };
}

export function login() {
  return dispatch => {
    dispatch(loginRequest());

	$.ajax({
		url: '/auth/login',
		dataType: 'json',
		success: (user) => {
			dispatch(loginSuccess(user))
		},
		error: (err) => {
			dispatch(loginFailure(err))
		},
	});
  };
}

function logoutRequest() {
  return {
	type: LOGOUT_REQUEST,
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    user: null,
  };
}

function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    user: null,
    error,
  };
}

export function logout() {
	return dispatch => {
      dispatch(logoutRequest());
      $.ajax({
   	   url: '/auth/login',
   	   dataType: 'json',
   	   success: () => {
   		   dispatch(logoutSuccess())
   	   },
   	   error: (err) => {
   		   dispatch(logoutFailure(err))
   	   },
      });
    };
}
