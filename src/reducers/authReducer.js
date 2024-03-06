// src/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/authActions';
import { VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE } from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        // token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isVerified: true,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
