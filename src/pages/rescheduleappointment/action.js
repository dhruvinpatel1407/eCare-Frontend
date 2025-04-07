import { showMessage } from "../../utils/ToastMessage/ShowMessage";

// Client/src/store/action.js
export const getExistingAppointmentDetails = (appointmentId) => {
  return (dispatch, getState) => {
    dispatch({ type: "GET_EXISTING_APPOINTMENT_DETAILS_REQUEST" });

    try {
      // Get appointment from state instead of API
      const allAppointments = getState().appointment.appointments;
      console.log("allAppointments", allAppointments);

      if (!allAppointments) {
        throw new Error("No appointments found in state");
      }
      const existingAppointment = allAppointments.find(
        (appointment) => appointment._id === appointmentId
      );

      if (!existingAppointment) {
        throw new Error("Appointment not found");
      }

      dispatch({
        type: "GET_EXISTING_APPOINTMENT_DETAILS_SUCCESS",
        payload: existingAppointment,
      });
    } catch (error) {
      dispatch({
        type: "GET_EXISTING_APPOINTMENT_DETAILS_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const rescheduleAppointment = (appointmentId, newDateTime, navigate) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  return async (dispatch) => {
    dispatch({ type: "RESCHEDULE_APPOINTMENT_REQUEST" });

    return fetch(`${backendUrl}/appointments/${appointmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        newTime: newDateTime,
        status: "rescheduled",
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "RESCHEDULE_APPOINTMENT_SUCCESS",
          payload: data,
        });
        setTimeout(() => 
          navigate("/appointments"),
        showMessage("success", "Appointment rescheduled successfully")
        , 1000); 
      })
      .catch((error) => {
        dispatch({
          type: "RESCHEDULE_APPOINTMENT_FAILURE",
          payload: error.message || "Something went wrong",
        });
        showMessage("error", error.message || "Something went wrong");
      });
  };
};
;

