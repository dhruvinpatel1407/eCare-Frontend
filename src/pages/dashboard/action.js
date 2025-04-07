// Client/src/pages/dashboard/action.js
import { showMessage } from "../../utils/ToastMessage/ShowMessage";

// Action Types
export const DOCTOR_REQUEST = "DOCTOR_REQUEST";
export const DOCTOR_SUCCESS = "DOCTOR_SUCCESS";
export const DOCTOR_FAILURE = "DOCTOR_FAILURE";

// Action Creator
export const fetchDoctors = () => async (dispatch) => {
    dispatch(doctorRequest());
    
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
        const response = await fetch(`${backendUrl}/physicians/all`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (response.status === 200) {
            dispatch(doctorSuccess(data));
        } else {
            dispatch(doctorFailure(data.error || 'Failed to fetch doctors'));
            // showMessage('error', data.error || 'Failed to fetch doctors');
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
        dispatch(doctorFailure(error.message));
        // showMessage('error',error.message || 'Failed to fetch doctors.');
    }
};

// Action Helpers
const doctorRequest = () => ({
    type: DOCTOR_REQUEST,
    payload: true
});

const doctorSuccess = (doctors) => ({
    type: DOCTOR_SUCCESS,
    payload: doctors
});

const doctorFailure = (error) => ({
    type: DOCTOR_FAILURE,
    payload: error,
    error: true
});

export default {
    DOCTOR_REQUEST,
    DOCTOR_SUCCESS,
    DOCTOR_FAILURE,
    fetchDoctors
};