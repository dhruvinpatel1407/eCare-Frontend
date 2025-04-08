import appointmentReducer from './reducer';
import {
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_FAILURE,
  APPOINTMENT_SUCCESS_UPDATE
} from './action';

describe("appointmentReducer", () => {
  const initialState = {
    loading: false,
    appointments: [],
    error: null,
  };

  it("should return the initial state", () => {
    expect(appointmentReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle APPOINTMENT_REQUEST", () => {
    const action = { type: APPOINTMENT_REQUEST };
    const newState = appointmentReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it("should handle APPOINTMENT_SUCCESS", () => {
    const mockAppointments = [
      { id: 1, doctor: "Dr. Smith", date: "2025-04-10" },
      { id: 2, doctor: "Dr. Jane", date: "2025-04-11" }
    ];
    const action = { type: APPOINTMENT_SUCCESS, payload: mockAppointments };
    const newState = appointmentReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.appointments).toEqual(mockAppointments);
    expect(newState.error).toBe(null);
  });

  it("should handle APPOINTMENT_FAILURE", () => {
    const error = "Failed to fetch appointments.";
    const action = { type: APPOINTMENT_FAILURE, payload: error };
    const newState = appointmentReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });

  it("should handle APPOINTMENT_SUCCESS_UPDATE", () => {
    const prevState = {
      ...initialState,
      appointments: [
        { id: 1, doctor: "Dr. Smith", date: "2025-04-10", status: "booked" },
        { id: 2, doctor: "Dr. Jane", date: "2025-04-11", status: "booked" }
      ]
    };
    const updatedAppointment = { id: 2, doctor: "Dr. Jane", date: "2025-04-11", status: "cancelled" };
    const action = { type: APPOINTMENT_SUCCESS_UPDATE, payload: updatedAppointment };
    const newState = appointmentReducer(prevState, action);
    expect(newState.appointments.find(a => a.id === 2)?.status).toBe("cancelled");
    expect(newState.loading).toBe(false);
  });
});
