import {
  GET_REPORTS_FAILURE,
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  UPLOAD_REPORT_FAILURE,
  UPLOAD_REPORT_REQUEST,
  UPLOAD_REPORT_SUCCESS,
} from "./action";

const initialState = {
    reports: [],
    uploading: false,
    error: null
  };
  
  export default function labReportReducer(state = initialState, action) {
    switch (action.type) {
      case GET_REPORTS_REQUEST:
        return { ...state, error: null };
      case GET_REPORTS_SUCCESS:
        return { 
          ...state, 
          reports: action.payload,
          error: null 
        };
      case GET_REPORTS_FAILURE:
        return { 
          ...state, 
          error: action.error 
        };
      case UPLOAD_REPORT_REQUEST:
        return { 
          ...state, 
          uploading: true 
        };
      case UPLOAD_REPORT_SUCCESS:
        return { 
          ...state, 
          uploading: false,
          reports: [...state.reports, action.payload]
        };
      case UPLOAD_REPORT_FAILURE:
        return { 
          ...state, 
          uploading: false,
          error: action.error 
        };
      default:
        return state;
    }
  }