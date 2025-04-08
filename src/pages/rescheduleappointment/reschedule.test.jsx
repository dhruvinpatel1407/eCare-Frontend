import {
    getExistingAppointmentDetails,
    rescheduleAppointment,
    GET_EXISTING_APPOINTMENT_DETAILS_REQUEST,
    GET_EXISTING_APPOINTMENT_DETAILS_SUCCESS,
    GET_EXISTING_APPOINTMENT_DETAILS_FAILURE,
    RESCHEDULE_APPOINTMENT_REQUEST,
    RESCHEDULE_APPOINTMENT_SUCCESS,
    RESCHEDULE_APPOINTMENT_FAILURE,
  } from './action'; // adjust path as needed
  
  import { showMessage } from '../../utils/ToastMessage/ShowMessage';
  
  vi.mock('../../utils/ToastMessage/ShowMessage', () => ({
    showMessage: vi.fn(),
  }));
  
  global.fetch = vi.fn();
  
  describe('RescheduleAppointment Actions', () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();
  
    beforeEach(() => {
      vi.clearAllMocks();
      localStorage.setItem('token', 'mocked_token');
    });
  
    describe('getExistingAppointmentDetails', () => {
      it('dispatches GET_EXISTING_APPOINTMENT_DETAILS_SUCCESS if appointment is found', async () => {
        const appointmentId = '123';
        const mockState = {
          appointment: {
            appointments: [{ _id: '123', patient: 'John Doe' }],
          },
        };
  
        const getState = () => mockState;
  
        await getExistingAppointmentDetails(appointmentId)(dispatch, getState);
  
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_EXISTING_APPOINTMENT_DETAILS_REQUEST,
        });
  
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_EXISTING_APPOINTMENT_DETAILS_SUCCESS,
          payload: { _id: '123', patient: 'John Doe' },
        });
      });
  
      it('dispatches GET_EXISTING_APPOINTMENT_DETAILS_FAILURE if appointment not found', async () => {
        const getState = () => ({
          appointment: { appointments: [{ _id: '999' }] },
        });
  
        await getExistingAppointmentDetails('123')(dispatch, getState);
  
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_EXISTING_APPOINTMENT_DETAILS_REQUEST,
        });
  
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_EXISTING_APPOINTMENT_DETAILS_FAILURE,
          payload: 'Appointment not found',
        });
      });
  
      it('dispatches GET_EXISTING_APPOINTMENT_DETAILS_FAILURE if no appointments in state', async () => {
        const getState = () => ({ appointment: {} });
  
        await getExistingAppointmentDetails('123')(dispatch, getState);
  
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_EXISTING_APPOINTMENT_DETAILS_REQUEST,
        });
  
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_EXISTING_APPOINTMENT_DETAILS_FAILURE,
          payload: 'No appointments found in state',
        });
      });
    });
  
    describe('rescheduleAppointment', () => {
      it('dispatches RESCHEDULE_APPOINTMENT_SUCCESS on successful reschedule', async () => {
        const mockData = { _id: '123', status: 'rescheduled' };
  
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });
  
        await rescheduleAppointment('123', '2025-04-10T10:00:00', navigate)(dispatch);
  
        expect(dispatch).toHaveBeenCalledWith({ type: RESCHEDULE_APPOINTMENT_REQUEST });
        expect(dispatch).toHaveBeenCalledWith({
          type: RESCHEDULE_APPOINTMENT_SUCCESS,
          payload: mockData,
        });
  
        // Wait for the delayed toast and navigate to be triggered
        await new Promise((resolve) => setTimeout(resolve, 1100));
  
        expect(showMessage).toHaveBeenCalledWith('success', 'Appointment rescheduled successfully');
        });
    });
  });