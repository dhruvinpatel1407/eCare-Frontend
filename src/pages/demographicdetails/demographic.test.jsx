import { fetchDemographicDetails, addDemographicDetails, updateDemographicDetails } from './action';
import {
  FETCH_DEMOGRAPHIC_DETAILS,
  DEMOGRAPHIC_DETAILS_LOADING,
  DEMOGRAPHIC_DETAILS_ERROR,
  ADD_DEMOGRAPHIC_DETAILS,
  UPDATE_DEMOGRAPHIC_DETAILS
} from './action';
import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

describe('Demographic Actions', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'mocked_token');
  });

  it('dispatches FETCH_DEMOGRAPHIC_DETAILS on success', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ userName: 'John' }),
    });

    await fetchDemographicDetails('userId')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: DEMOGRAPHIC_DETAILS_LOADING });
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_DEMOGRAPHIC_DETAILS,
      payload: { userName: 'John' },
    });
  });

  it('dispatches ADD_DEMOGRAPHIC_DETAILS on successful post', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ userName: 'New User' }),
    });

    await addDemographicDetails({
      userName: 'New User',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      bloodGroup: 'O+',
      height: '180',
      weight: '75',
      occupation: 'Engineer',
      maritalStatus: 'Single',
      address: { street: '123 Main', city: 'City', state: 'State', zipCode: '12345' }
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: DEMOGRAPHIC_DETAILS_LOADING });
    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_DEMOGRAPHIC_DETAILS,
      payload: { userName: 'New User' },
    });
  });

  it('dispatches UPDATE_DEMOGRAPHIC_DETAILS on successful put', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ userName: 'Updated User' }),
    });

    await updateDemographicDetails('123', {
      userName: 'Updated User',
      dateOfBirth: '1990-01-01',
      gender: 'Female',
      bloodGroup: 'B+',
      height: '165',
      weight: '60',
      occupation: 'Doctor',
      maritalStatus: 'Married',
      address: { street: '456 Lane', city: 'Town', state: 'Province', zipCode: '67890' }
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: DEMOGRAPHIC_DETAILS_LOADING });
    expect(dispatch).toHaveBeenCalledWith({
      type: UPDATE_DEMOGRAPHIC_DETAILS,
      payload: { userName: 'Updated User' },
    });
  });

  it('dispatches DEMOGRAPHIC_DETAILS_ERROR on failed fetch', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await fetchDemographicDetails('userId')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: DEMOGRAPHIC_DETAILS_LOADING });
    expect(dispatch).toHaveBeenCalledWith({
      type: DEMOGRAPHIC_DETAILS_ERROR,
      payload: 'Failed to fetch demographic details',
    });
  });
});
