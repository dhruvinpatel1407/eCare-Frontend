import { showMessage } from "../../utils/ToastMessage/ShowMessage";

// Appointment Actions
export const APPOINTMENT_REQUEST = "APPOINTMENT_REQUEST";
export const APPOINTMENT_SUCCESS = "APPOINTMENT_SUCCESS";
export const APPOINTMENT_FAILURE = "APPOINTMENT_FAILURE";
export const APPOINTMENT_SUCCESS_UPDATE = "APPOINTMENT_SUCCESS_UPDATE"
const fetchAppointments = () => async (dispatch) => {
    dispatch(appointmentRequest());

    const token = localStorage.getItem("token");
    const headers = new Headers({
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    fetch(`${backendUrl}/appointments/all`, { headers })
        .then(async response => {
            if (!response.ok) {
                const err = await response.json();
                return await Promise.reject(err);
            }
            return response.json();
        })
        .then(data => {
            dispatch(appointmentSuccess(data));
            
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
            dispatch(appointmentFailure(error.message || 'Failed to fetch appointments.'));
            
        });
};

 const cancelAppointment = (appointmentId) => {
    return async (dispatch) => {
        dispatch(appointmentRequest());

        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL 
        try {
            const response = await fetch(`${backendUrl}/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ status: "cancelled" })  // Sending status in payload
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to cancel appointment");
            }

            const data = await response.json();
            dispatch(successAppointment(data));
            showMessage('success','Appointments cancelled successfully!');
            return Promise.resolve(data);
        } catch (error) {
            dispatch(failureAppointment(error.message));
            return Promise.reject(error); 
        }
    };
};


 const rescheduleAppointment = (appointmentId, newDate) => {
    const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL 
    return async (dispatch) => {
        dispatch(appointmentRequest());
        try {
            // Add your API call here
            const response = await fetch(`${backendUrl}/appointments/${appointmentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ newDate : newDate,
                    status : "rescheduled"
                 })
            });
            const data = await response.json();
            dispatch(successAppointment(data));
        } catch (error) {
            dispatch(failureAppointment(error.message));
        }
    };
};

const appointmentRequest = () => ({ 
    type: APPOINTMENT_REQUEST});

const appointmentSuccess = (appointments) => ({
    type: APPOINTMENT_SUCCESS,
    payload: appointments
});

const appointmentFailure = (error) => ({
    type: APPOINTMENT_FAILURE,
    payload: error,
    error: true
});

const successAppointment = (appointment) => ({
    type: APPOINTMENT_SUCCESS_UPDATE,
    payload: appointment
});

const failureAppointment = (error) => ({
    type: APPOINTMENT_FAILURE,
    payload: error
});

export {
   fetchAppointments,
   cancelAppointment,
   rescheduleAppointment,
   appointmentRequest,
   appointmentSuccess,
   appointmentFailure,
   successAppointment,
   failureAppointment
};
