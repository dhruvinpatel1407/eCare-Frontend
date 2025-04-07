// Client/src/store/reducer.js
const initialState = {
    existingAppointment: null,
    bookedTimeSlots: [],
    loading: false,
    error: null,
    success: false
  };
  
  const rescheduleReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_EXISTING_APPOINTMENT_DETAILS_REQUEST':
        return {
          ...initialState,
          loading: true,
          error: null
        };
      case 'GET_EXISTING_APPOINTMENT_DETAILS_SUCCESS':
        return {
          ...initialState,
          existingAppointment: action.payload,
          loading: false
        };
      case 'GET_EXISTING_APPOINTMENT_DETAILS_FAILURE':
        return {
          ...initialState,
          error: action.payload,
          loading: false
        };
      case 'RESCHEDULE_APPOINTMENT_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'RESCHEDULE_APPOINTMENT_SUCCESS':
        return {
          ...state,
          loading: false,
          success: true,
          error: null
        };
      case 'RESCHEDULE_APPOINTMENT_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false
        };
      default:
        return state;
    }
  };
  
  export default rescheduleReducer;