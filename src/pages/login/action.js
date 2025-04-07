import { showMessage } from "../../utils/ToastMessage/ShowMessage";
import { setAuthToken } from "../../utils/SetToken";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const loginaction = (formData, navigate) => async (dispatch) => {
  dispatch(loginRequest());

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  return fetch(`${backendUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async(response) => {
      if (!response.ok) {
        const errorData = await response.json();
        
        throw new Error(errorData.error || "Login failed");
        
      }
     
      // Extract token from headers correctly
      const token = response.headers.get("x-auth-token");
      
      return response.json().then((data) => ({ data, token }));
    })
    .then(({ data, token }) => {
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }

      dispatch(loginSuccess(data));
      showMessage("success" ,"Login successful!" );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    })
    .catch((error) => {
      const errorMessage = error.message || "Signup failed. Please try again.";

      dispatch(loginFailure(errorMessage));
      showMessage("error", errorMessage);});
};

const firebaseLoginAction = (formData, navigate) => async (dispatch) => {
  dispatch(loginRequest());

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${backendUrl}/users/firebase-signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const { token } = await response.json();
    
    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);
    }

    dispatch(loginSuccess(formData));
    showMessage("success", "Authentication successful!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (error) {
    const errorMessage = error.message || "Authentication failed. Please try again.";
    dispatch(loginFailure(errorMessage));
    showMessage("error", errorMessage);
  }
};


const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export { loginRequest, loginSuccess, loginFailure, loginaction, firebaseLoginAction };
