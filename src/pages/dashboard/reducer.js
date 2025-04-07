import { DOCTOR_FAILURE, DOCTOR_REQUEST, DOCTOR_SUCCESS } from "./action";

// Client/src/reducers/doctors.js
const initialState = {
  doctors: [],
  loading: false,
  error: null
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
      case DOCTOR_REQUEST:
          return {
              ...state,
              loading: true,
              error: null
          };
      case DOCTOR_SUCCESS:
          return {
              ...state,
              doctors: action.payload,
              loading: false
          };
      case DOCTOR_FAILURE:
          return {
              ...state,
              error: action.payload,
              loading: false
          };
      default:
          return state;
  }
} 



