import {
  ADD_DEMOGRAPHIC_DETAILS,
  DEMOGRAPHIC_DETAILS_LOADING,
  UPDATE_DEMOGRAPHIC_DETAILS,
  DEMOGRAPHIC_DETAILS_ERROR,
  FETCH_DEMOGRAPHIC_DETAILS,
} from "./action";


const initialState = {
    demographicDetails: {},
    isLoading: false,
    error: null
  };
  
  export default function demographicReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_DEMOGRAPHIC_DETAILS:
            return {
              ...state,
              demographicDetails: action.payload,
              isLoading: false,
              error: null,
        };
      case DEMOGRAPHIC_DETAILS_LOADING:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case ADD_DEMOGRAPHIC_DETAILS:
        return {
          ...state,
          demographicDetails: { ...state.demographicDetails, ...action.payload },
          isLoading: false,
          error: null,
        };
      case UPDATE_DEMOGRAPHIC_DETAILS:
        return {
          ...state,
          demographicDetails: { ...state.demographicDetails, ...action.payload },
          isLoading: false,
          error: null,

        };
      case DEMOGRAPHIC_DETAILS_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        return state;
    }
  }