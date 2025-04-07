export const FETCH_SERVICES = "FETCH_SERVICES";
export const FETCH_SERVICES_REQUEST = "FETCH_SERVICES_REQUEST";
export const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS";
export const FETCH_SERVICES_FAILURE = "FETCH_SERVICES_FAILURE";

export const fetchServices = () => async (dispatch) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    dispatch({ type: FETCH_SERVICES_REQUEST });
    
    const response = await fetch(`${backendUrl}/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error('No services found');
    }
    
    const data = await response.json();
    
    dispatch({
      type: FETCH_SERVICES_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_SERVICES_FAILURE,
      payload: error.message
    });
  }
};