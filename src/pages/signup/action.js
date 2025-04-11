// Client/src/pages/signup/action.js
import { showMessage } from "../../utils/ToastMessage/ShowMessage";
import { setAuthToken } from "../../utils/SetToken";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signup = (formData, navigate) => async (dispatch) => {
  dispatch(signupRequest());

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  return fetch(`${backendUrl}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json(); // Extract JSON error response

        throw new Error(errorData.error || "Signup failed");
      }
      // Extract token from headers correctly
      const token = response.headers.get("x-auth-token");
      return response.json().then((data) => ({ data, token }));
    })
    .then(({data, token}) => {
      console.log(token);
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }
      dispatch(signupSuccess(data));
      showMessage("success", "Account Created Successfully!");
      
        navigate("/dashboard");
      
    })
    .catch((error) => {
      const errorMessage = error.message || "Signup failed. Please try again.";

      dispatch(signupFailure(errorMessage));
      showMessage("error", errorMessage);
    });
};

const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});
