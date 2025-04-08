import bookingReducer from "./reducer";
import {
  GET_PHYSICIAN_DETAILS_REQUEST,
  GET_PHYSICIAN_DETAILS_SUCCESS,
  GET_PHYSICIAN_DETAILS_FAILURE,
  GET_BOOKED_APPOINTMENTS_REQUEST,
  GET_BOOKED_APPOINTMENTS_SUCCESS,
  GET_BOOKED_APPOINTMENTS_FAILURE,
  BOOK_APPOINTMENT_REQUEST,
  BOOK_APPOINTMENT_SUCCESS,
  BOOK_APPOINTMENT_FAILURE
} from "./action";

describe("bookingReducer", () => {
  const initialState = {
    loading: false,
    physicianDetails: {},
    bookedTimeSlots: [],
    bookedTime: null,
    error: null,
    bookingError: null
  };

  it("should return the initial state", () => {
    expect(bookingReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_PHYSICIAN_DETAILS_REQUEST", () => {
    const action = { type: GET_PHYSICIAN_DETAILS_REQUEST };
    const newState = bookingReducer(initialState, action);
    expect(newState.loading).toBe(true);
  });

  it("should handle GET_PHYSICIAN_DETAILS_SUCCESS", () => {
    const physician = { name: "Dr. John Doe" };
    const action = { type: GET_PHYSICIAN_DETAILS_SUCCESS, payload: physician };
    const newState = bookingReducer(initialState, action);
    expect(newState.physicianDetails).toEqual(physician);
    expect(newState.loading).toBe(false);
  });

  it("should handle GET_PHYSICIAN_DETAILS_FAILURE", () => {
    const error = "Error fetching physician details";
    const action = { type: GET_PHYSICIAN_DETAILS_FAILURE, payload: error };
    const newState = bookingReducer(initialState, action);
    expect(newState.error).toBe(error);
    expect(newState.loading).toBe(false);
  });

  it("should handle GET_BOOKED_APPOINTMENTS_REQUEST", () => {
    const action = { type: GET_BOOKED_APPOINTMENTS_REQUEST };
    const newState = bookingReducer(initialState, action);
    expect(newState.loading).toBe(true);
  });

  it("should handle GET_BOOKED_APPOINTMENTS_SUCCESS", () => {
    const slots = ["9:00 AM", "10:00 AM"];
    const action = { type: GET_BOOKED_APPOINTMENTS_SUCCESS, payload: slots };
    const newState = bookingReducer(initialState, action);
    expect(newState.bookedTimeSlots).toEqual(slots);
    expect(newState.loading).toBe(false);
  });

  it("should handle GET_BOOKED_APPOINTMENTS_FAILURE", () => {
    const error = "Failed to fetch appointments";
    const action = { type: GET_BOOKED_APPOINTMENTS_FAILURE, payload: error };
    const newState = bookingReducer(initialState, action);
    expect(newState.error).toBe(error);
    expect(newState.loading).toBe(false);
  });

  it("should handle BOOK_APPOINTMENT_REQUEST", () => {
    const action = { type: BOOK_APPOINTMENT_REQUEST };
    const newState = bookingReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.bookingError).toBe(null);
  });

  it("should handle BOOK_APPOINTMENT_SUCCESS", () => {
    const appointment = { time: "11:00 AM", date: "2025-04-09" };
    const action = { type: BOOK_APPOINTMENT_SUCCESS, payload: appointment };
    const newState = bookingReducer(initialState, action);
    expect(newState.bookedAppointment).toEqual(appointment);
    expect(newState.loading).toBe(false);
    expect(newState.bookingError).toBe(null);
  });

  it("should handle BOOK_APPOINTMENT_FAILURE", () => {
    const error = "Booking failed";
    const action = { type: BOOK_APPOINTMENT_FAILURE, payload: error };
    const newState = bookingReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.bookingError).toBe(error);
  });
});
