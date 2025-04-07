import {
  GET_PHYSICIAN_DETAILS_FAILURE,
  GET_PHYSICIAN_DETAILS_REQUEST,
  GET_PHYSICIAN_DETAILS_SUCCESS,
  GET_BOOKED_APPOINTMENTS_REQUEST,
  GET_BOOKED_APPOINTMENTS_SUCCESS,
  GET_BOOKED_APPOINTMENTS_FAILURE,
  BOOK_APPOINTMENT_REQUEST,
  BOOK_APPOINTMENT_SUCCESS,
  BOOK_APPOINTMENT_FAILURE 
} from "./action";

const initialState = {
  loading: false,
  physicianDetails: {},
  bookedTimeSlots: [],
  bookedTime: null,
  error: null,
  bookingError: null
};

export default function bookingReducer(state = initialState, action) {
    switch(action.type) {
      case GET_PHYSICIAN_DETAILS_REQUEST:
      case GET_BOOKED_APPOINTMENTS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case GET_PHYSICIAN_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          physicianDetails: action.payload
        };
      case GET_BOOKED_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          bookedTimeSlots: action.payload
        };
      case GET_PHYSICIAN_DETAILS_FAILURE:
      case GET_BOOKED_APPOINTMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        case BOOK_APPOINTMENT_REQUEST:
            return {
              ...state,
              loading: true,
              bookingError: null
            };
          case BOOK_APPOINTMENT_SUCCESS:
            return {
              ...state,
              loading: false,
              bookedAppointment: action.payload,
              bookingError: null
            };
          case BOOK_APPOINTMENT_FAILURE:
            return {
              ...state,
              loading: false,
              bookingError: action.payload
            };
      default:
        return state;
    }
  }
