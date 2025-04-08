// Client/src/reducers/appointmentReducer.js
import { APPOINTMENT_SUCCESS, APPOINTMENT_REQUEST, APPOINTMENT_FAILURE, APPOINTMENT_SUCCESS_UPDATE } from "./action";
const initialState = {
    appointments: [],
    loading: false,
    error: null
};

export default function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case APPOINTMENT_SUCCESS:
            return {
                appointments: action.payload,
                loading: false,
                error: null
            };
        case APPOINTMENT_FAILURE:
            return {
                appointments: [],
                loading: false,
                error: action.payload
            };
            case APPOINTMENT_SUCCESS_UPDATE:
                return {
                    appointments: state.appointments.map(appointment => 
                        appointment._id === action.payload._id ? action.payload : appointment
                    ),
                    loading: false,
                    error: null
                };
        default:
            return state;
    }
}