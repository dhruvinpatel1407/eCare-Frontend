import * as actions from "./action"

const initialState = {
    loading: false,
    error: null,
    user: null,
  };
  
 
 const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actions.LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null,
        };
      case actions.LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
export default loginReducer;