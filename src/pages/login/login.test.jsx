/* src/pages/login/login.test.jsx */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loginaction, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action';
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

describe('login action', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('dispatches LOGIN_SUCCESS on successful login', async () => {
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

    await loginaction({ emailOrUsername: 'test@example.com', passWord: 'password123' }, mockNavigate)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: LOGIN_REQUEST });
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(setAuthToken).toHaveBeenCalledWith(mockToken);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: LOGIN_SUCCESS,
      payload: mockUser,
    });
    expect(showMessage).toHaveBeenCalledWith('success', 'Logged in Successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('dispatches LOGIN_FAILURE on failed login with server error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      })
    );

    await loginaction({ emailOrUsername: 'test@example.com', passWord: 'wrongpass' }, mockNavigate)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: LOGIN_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: LOGIN_FAILURE,
      payload: 'Invalid credentials',
    });
    expect(showMessage).toHaveBeenCalledWith('error', 'Invalid credentials');
  });

  it('dispatches LOGIN_FAILURE on fetch/network error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    await loginaction({ emailOrUsername: 'test@example.com', passWord: 'password123' }, mockNavigate)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: LOGIN_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: LOGIN_FAILURE,
      payload: 'Network Error',
    });
    expect(showMessage).toHaveBeenCalledWith('error', 'Network Error');
  });
});