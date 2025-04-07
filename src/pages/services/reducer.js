import { FETCH_SERVICES_REQUEST, FETCH_SERVICES_FAILURE, FETCH_SERVICES_SUCCESS } from "./action";

const initialState = {
    services: [],
    loading: false,
    error: null
  };
  
  export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_SERVICES_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_SERVICES_SUCCESS:
        return {
          services: action.payload,
          loading: false,
          error: null
        };
      case FETCH_SERVICES_FAILURE:
        return {
          services: [],
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  }