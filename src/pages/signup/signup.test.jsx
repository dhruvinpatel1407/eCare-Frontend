import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signup, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './action';
import { setAuthToken } from "../../utils/SetToken";
import { showMessage } from '../../utils/ToastMessage/ShowMessage';

// Mock the helper functions
vi.mock('../../utils/SetToken', () => ({
  setAuthToken: vi.fn(),
}));
vi.mock('../../utils/ToastMessage/ShowMessage', () => ({
  showMessage: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

describe('signup action', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('dispatches SIGNUP_SUCCESS on successful signup', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    const mockToken = 'mockToken123';

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: vi.fn(() => mockToken),
        },
        json: () => Promise.resolve(mockUser),
      })
    );

    await signup({ email: 'test@example.com' }, mockNavigate)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: SIGNUP_REQUEST });
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(setAuthToken).toHaveBeenCalledWith(mockToken);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: SIGNUP_SUCCESS,
      payload: mockUser,
    });
    expect(showMessage).toHaveBeenCalledWith('success', 'Account Created Successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('dispatches SIGNUP_FAILURE on failed signup with server error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Email already exists' }),
      })
    );

    await signup({ email: 'existing@example.com' }, mockNavigate)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: SIGNUP_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: SIGNUP_FAILURE,
      payload: 'Email already exists',
    });
    expect(showMessage).toHaveBeenCalledWith('error', 'Email already exists');
  });

  it('dispatches SIGNUP_FAILURE on fetch/network error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    await signup({ email: 'test@example.com' }, mockNavigate)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: SIGNUP_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: SIGNUP_FAILURE,
      payload: 'Network Error',
    });
    expect(showMessage).toHaveBeenCalledWith('error', 'Network Error');
  });
});
