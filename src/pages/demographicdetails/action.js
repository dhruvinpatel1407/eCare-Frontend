import { showMessage } from "../../utils/ToastMessage/ShowMessage";

export const ADD_DEMOGRAPHIC_DETAILS = "ADD_DEMOGRAPHIC_DETAILS";
export const UPDATE_DEMOGRAPHIC_DETAILS = "UPDATE_DEMOGRAPHIC_DETAILS";
export const DEMOGRAPHIC_DETAILS_LOADING = "DEMOGRAPHIC_DETAILS_LOADING";
export const DEMOGRAPHIC_DETAILS_ERROR = "DEMOGRAPHIC_DETAILS_ERROR";
export const FETCH_DEMOGRAPHIC_DETAILS = "FETCH_DEMOGRAPHIC_DETAILS";


export const fetchDemographicDetails = (userId) => {
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return async (dispatch) => {
    dispatch({ type: DEMOGRAPHIC_DETAILS_LOADING });
    try {
      const response = await fetch(`${backendUrl}/demographics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch demographic details");
      }
      const data = await response.json();
      
      dispatch({ type: FETCH_DEMOGRAPHIC_DETAILS, payload: data });
    } catch (error) {
      dispatch({ type: DEMOGRAPHIC_DETAILS_ERROR, payload: error.message });
    }
  };
};

export const addDemographicDetails = (data) => {

  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return async (dispatch) => {
    dispatch({ type: DEMOGRAPHIC_DETAILS_LOADING });
    try {

      const formData = new FormData();
      const address = data.address;
      formData.append("firstName", data.userName);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("gender", data.gender);
      formData.append("bloodGroup", data.bloodGroup);
      formData.append("height", data.height);
      formData.append("weight", data.weight);
      formData.append("occupation", data.occupation);
      formData.append("maritalStatus", data.maritalStatus);
      formData.append("address[street]", address.street);
formData.append("address[city]", address.city);
formData.append("address[state]", address.state);
formData.append("address[zipCode]", address.zipCode);
      
      // Add profile image if available
      if (data.profilePicture) {
       
        formData.append("profilePicture", data.profilePicture);
      }
      // Post request to your API endpoint
      const response = await fetch(`${backendUrl}/demographics`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,          
      });

      if (!response.ok) {
        throw new Error("Failed to add demographic details");
      }
      showMessage("success", "Demographic details added successfully!");
      dispatch({ type: ADD_DEMOGRAPHIC_DETAILS, payload: await response.json(), });
    } catch (error) {
      dispatch({ type: DEMOGRAPHIC_DETAILS_ERROR, payload: error.message });
      showMessage("error", "Failed to add demographic details");
    }
  };
};

export const updateDemographicDetails = (id, data) => {

  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return async (dispatch) => {
    dispatch({ type: DEMOGRAPHIC_DETAILS_LOADING });
    try {
     
      const formData = new FormData();
     
      const address = data.address;

      formData.append("firstName", data.userName);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("gender", data.gender);
      formData.append("bloodGroup", data.bloodGroup);
      formData.append("height", data.height);
      formData.append("weight", data.weight);
      formData.append("occupation", data.occupation);
      formData.append("maritalStatus", data.maritalStatus);
      formData.append("address[street]", address.street);
formData.append("address[city]", address.city);
formData.append("address[state]", address.state);
formData.append("address[zipCode]", address.zipCode);
      
      // Add profile image if available
      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }

      // Put request to your API endpoint
      const response = await fetch(`${backendUrl}/demographics/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData                      
      });

      if (!response.ok) {
        throw new Error("Failed to update demographic details");
      }
      showMessage("success", "Demographic details updated successfully!");
      dispatch({ type: UPDATE_DEMOGRAPHIC_DETAILS, payload: await response.json(), });
    } catch (error) {
      showMessage("error", "Failed to update demographic details");
      dispatch({ type: DEMOGRAPHIC_DETAILS_ERROR, payload: error.message });
    }
  };
};
