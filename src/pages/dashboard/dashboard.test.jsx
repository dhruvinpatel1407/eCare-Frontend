// Client/src/pages/dashboard/__tests__/action.test.js
import { fetchDoctors, DOCTOR_REQUEST, DOCTOR_SUCCESS, DOCTOR_FAILURE } from './action';
import { vi } from 'vitest';

describe('fetchDoctors action', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('dispatches success action on API success', async () => {
    const mockDispatch = vi.fn();
    const mockDoctors = [{ name: 'Dr. Test' }];

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockDoctors,
    });

    await fetchDoctors()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: DOCTOR_REQUEST, payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: DOCTOR_SUCCESS, payload: mockDoctors });
  });

  it('dispatches failure action on API error', async () => {
    const mockDispatch = vi.fn();

    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'HTTP error! status: 500' }),
    });

    await fetchDoctors()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: DOCTOR_REQUEST, payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ 
      type: DOCTOR_FAILURE,
      payload: 'HTTP error! status: 500',
      error: true,
    });
  });

  it('dispatches failure on fetch throw', async () => {
    const mockDispatch = vi.fn();
    fetch.mockRejectedValue(new Error('Network error'));

    await fetchDoctors()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: DOCTOR_REQUEST, payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: DOCTOR_FAILURE,
      payload: 'Network error',
      error: true,
    });
  });
});
