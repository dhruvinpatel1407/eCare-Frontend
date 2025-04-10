import { showMessage } from "../../utils/ToastMessage/ShowMessage";

// Action types
export const GET_REPORTS_REQUEST = 'GET_REPORTS_REQUEST';
export const GET_REPORTS_SUCCESS = 'GET_REPORTS_SUCCESS';
export const GET_REPORTS_FAILURE = 'GET_REPORTS_FAILURE';

export const UPLOAD_REPORT_REQUEST = 'UPLOAD_REPORT_REQUEST';
export const UPLOAD_REPORT_SUCCESS = 'UPLOAD_REPORT_SUCCESS';
export const UPLOAD_REPORT_FAILURE = 'UPLOAD_REPORT_FAILURE';

// Add new action types for download
export const DOWNLOAD_REPORT_REQUEST = 'DOWNLOAD_REPORT_REQUEST';
export const DOWNLOAD_REPORT_SUCCESS = 'DOWNLOAD_REPORT_SUCCESS';
export const DOWNLOAD_REPORT_FAILURE = 'DOWNLOAD_REPORT_FAILURE';

// Helper functions for API calls
const apiGetReports = async () => {
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/pdf`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  return await response.json();
};

const apiUploadReport = async (formData) => {
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/pdf`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload report");
  }

  return await response.json();
};

// Add new helper function for download
const apiDownloadReport = async (filename) => {
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/pdf/${filename}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to download report");
  }

  const blob = await response.blob();
  const downloadUrl = URL.createObjectURL(blob);
  return { blob, downloadUrl };
};

// Action creators
export const getReports = () => {
  return async (dispatch) => {
    dispatch({ type: GET_REPORTS_REQUEST });
    try {
      const data = await apiGetReports();
      dispatch({ type: GET_REPORTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_REPORTS_FAILURE, payload: error.message });
    }
  };
};

export const uploadReport = (formData) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_REPORT_REQUEST });
    try {
      const result = await apiUploadReport(formData);
      showMessage("success", "Report uploaded successfully!");
      dispatch({ type: UPLOAD_REPORT_SUCCESS, payload: result });
      return result;
    } catch (error) {
      showMessage("error", "Failed to upload report");
      dispatch({ type: UPLOAD_REPORT_FAILURE, payload: error.message });
      throw error;
    }
  };
};

// Add new action creator for download
export const downloadReport = (filename) => {
    console.log(filename);
  return async (dispatch) => {
    dispatch({ type: DOWNLOAD_REPORT_REQUEST });
    try {
      console.log("API call to download report");
      const { blob, downloadUrl } = await apiDownloadReport(filename);
      console.log(downloadUrl);
      // Create a download link and click it
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename; // Use the filename from your API response
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
      
      dispatch({ type: DOWNLOAD_REPORT_SUCCESS, payload: blob });
      showMessage("success", "Report downloaded successfully!");
    } catch (error) {
      dispatch({ type: DOWNLOAD_REPORT_FAILURE, payload: error.message });
      showMessage("error", "Failed to download report");
    }
  };
};