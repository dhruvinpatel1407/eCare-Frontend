// Client/src/reducers/signupReducer.js
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
  } from './action';
  
  const initialState = {
    loading: false,
    error: null,
    user: null
  };
  
  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null
        };
      case SIGNUP_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default signupReducer;