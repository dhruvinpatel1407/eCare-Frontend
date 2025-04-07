import { showMessage } from "../../utils/ToastMessage/ShowMessage";

export const GET_PHYSICIAN_DETAILS_REQUEST = 'GET_PHYSICIAN_DETAILS_REQUEST';
export const GET_PHYSICIAN_DETAILS_SUCCESS = 'GET_PHYSICIAN_DETAILS_SUCCESS';
export const GET_PHYSICIAN_DETAILS_FAILURE = 'GET_PHYSICIAN_DETAILS_FAILURE';
export const GET_BOOKED_APPOINTMENTS_REQUEST = 'GET_BOOKED_APPOINTMENTS_REQUEST';
export const GET_BOOKED_APPOINTMENTS_SUCCESS = 'GET_BOOKED_APPOINTMENTS_SUCCESS';
export const GET_BOOKED_APPOINTMENTS_FAILURE = 'GET_BOOKED_APPOINTMENTS_FAILURE';
export const BOOK_APPOINTMENT_REQUEST = 'BOOK_APPOINTMENT_REQUEST';
export const BOOK_APPOINTMENT_SUCCESS = 'BOOK_APPOINTMENT_SUCCESS';
export const BOOK_APPOINTMENT_FAILURE = 'BOOK_APPOINTMENT_FAILURE';


export const getPhysicianDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PHYSICIAN_DETAILS_REQUEST });
 
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const token = localStorage.getItem('token');
    const response = await fetch(`${backendUrl}/physicians/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch physician details');
      }
  
      const data = await response.json();
    
    dispatch({
      type: GET_PHYSICIAN_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_PHYSICIAN_DETAILS_FAILURE,
      payload: error.message
    });
  }
};

export const getBookedAppointments = (physicianId) => async (dispatch) => {
    try {
      dispatch({ type: GET_BOOKED_APPOINTMENTS_REQUEST });
  
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendUrl}/appointments/physician/${physicianId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch booked appointments');
      }
  
      const data = await response.json();
      const bookedTimes = data.map(booking => booking.time);
      dispatch({
        type: GET_BOOKED_APPOINTMENTS_SUCCESS,
        payload: bookedTimes
      });
    } catch (error) {
      dispatch({
        type: GET_BOOKED_APPOINTMENTS_FAILURE,
        payload: error.message
      });
    }
  };


  export const bookAppointment = (physicianId, selectedTime) => async (dispatch) => {
    try {
      dispatch({ type: BOOK_APPOINTMENT_REQUEST });
  
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${backendUrl}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          // user: userId,
          physicianId,
          selectedTime,
          status: "booked"
        })
      });
      
      const data = await response.json();

      if (!response.ok) { 
        throw new Error(data.message || "Something went wrong"); // Show API error message if available
      }
      
      dispatch({
        type: BOOK_APPOINTMENT_SUCCESS,
        payload: data
      });
      showMessage("success", "Appointment booked successfully");
    } catch (error) {
      dispatch({
        type: BOOK_APPOINTMENT_FAILURE,
        payload: error.message
      });
      console.log(error);
      showMessage("error",error.message);
    }
  };