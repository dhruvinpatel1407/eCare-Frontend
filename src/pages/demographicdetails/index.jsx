import React, { useState, useEffect } from "react";
import InputField from "../../components/inputField";
import { connect, useSelector } from "react-redux";
import { validateForm } from "../../utils/validations";

import {
  addDemographicDetails,
  updateDemographicDetails,
  fetchDemographicDetails,
} from "./action";
import { showMessage } from "../../utils/ToastMessage/ShowMessage";

// Add this helper function to convert ISO date to dd/mm/yyyy format
const convertIsoDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const convertDateFormat = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null; // Invalid date
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Adding 1 since months are 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Add this helper function to convert dd/mm/yyyy back to ISO format
const convertDateToIso = (dateString) => {
  if (!dateString || !dateString.includes("-")) return ""; // Check for valid format
  const parts = dateString.split("-");
  if (parts.length !== 3) return "";
  const [year, month, day] = parts;
  const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return isNaN(isoDate.getTime()) ? "" : isoDate.toISOString();
};

const DemographicForm = ({
  addDemographicDetails,
  updateDemographicDetails,
  fetchDemographicDetails,
  isLoading,
  error,
  demographicDetails,
}) => {
  // Get demographic details from Redux store
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const data = useSelector(
    (state) =>
      state.demographic.demographicDetails[0] ||
      state.demographic.demographicDetails
  );

  const demographicId = data?._id;
  
  // Initialize form data with default values
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    maritalStatus: "",
    occupation: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      profilePicture: null,
    },
  });
  const [showInput, setShowInput] = useState(false);

  const handleToggleInput = () => {
    setShowInput(true);
  };
  // Fetch demographic details when component mounts
  useEffect(() => {
    fetchDemographicDetails();
  }, [fetchDemographicDetails]);

  // Update form data when demographic details are fetched
  useEffect(() => {
    if (
      demographicDetails &&
      (demographicDetails.length > 0 || demographicDetails?.message)
    ) {
      const demographicData = demographicDetails[0] || demographicDetails;

      if (demographicData.message === "No demographics found") {
        // User is new, populate only the userName from userId
        setFormData((prev) => ({
          ...prev,
          userName: demographicData?.userId?.userName || "",
        }));
        setIsUpdateForm(false);
      } else {
        // User has demographic details
        setFormData({
          userName: demographicData?.userId?.userName || "",
          dateOfBirth: convertIsoDate(demographicData?.dateOfBirth) || "",
          gender: demographicData?.gender || "",
          bloodGroup: demographicData?.bloodGroup || "",
          height: demographicData?.height || "",
          weight: demographicData?.weight || "",
          maritalStatus: demographicData?.maritalStatus || "",
          occupation: demographicData?.occupation || "",
          address: {
            street: demographicData?.address?.street || "",
            city: demographicData?.address?.city || "",
            state: demographicData?.address?.state || "",
            zipCode: demographicData?.address?.zipCode || "",
          },
          profilePicture: demographicData?.profilePicture || "",
        });
        setIsUpdateForm(true);
        const buffer = demographicData?.profilePicture?.data;
        const mimeType = demographicData?.profilePictureType || "image/jpeg";

        if (buffer && Array.isArray(buffer)) {
          const uint8Array = new Uint8Array(buffer);
          const blob = new Blob([uint8Array], { type: mimeType });
          const imageUrl = URL.createObjectURL(blob);

          setPreview(imageUrl);
        }
      }
    }
  }, [demographicDetails]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formDataWithIsoDate = {
      ...formData,
      dateOfBirth: convertDateToIso(formData.dateOfBirth),
    };

    // Perform form validation using your existing validateForm function
    const errors = validateForm(formData, "demographic");

    const getFirstErrorMessage = (errors) => {
      for (const key in errors) {
        if (typeof errors[key] === "string" && errors[key] !== "") {
          return errors[key];
        } else if (typeof errors[key] === "object") {
          const nestedError = getFirstErrorMessage(errors[key]);

          if (nestedError) return nestedError;
        }
      }
      return null;
    };
    // Check if there are any errors
    const firstErrorMessage = getFirstErrorMessage(errors);

    if (firstErrorMessage) {
      // Show the first error message
      showMessage("error", firstErrorMessage);
      return;
    }
    // If this is an update form, use updateDemographicDetails
    // If this is a create form, use addDemographicDetails
    if (isUpdateForm) {
      updateDemographicDetails(demographicId, formDataWithIsoDate);
    } else {
      await addDemographicDetails(formData);
      fetchDemographicDetails();
    }
  };

  const handleFilePreview = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // This will give you the URL to render in your img tag
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (name, value) => {
    if (name.includes("address")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (name === "profilePicture") {
      handleFilePreview(value);

      setFormData((prev) => ({
        ...prev,
        profilePicture: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  

  return (
    <div className="w-full bg-[#FFF2F2]">
    <div className="pt-20 max-w-3xl mx-auto py-12 px-6 bg-[#FFF2F2] shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#2D336B] font-sans">
        Patient Information
      </h2>

      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} className="space-y-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#A9B5DF] shadow-sm"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-[#A9B5DF] flex items-center justify-center text-[#2D336B] text-sm">
                No Image
              </div>
            )}
            <label
              onClick={handleToggleInput}
              className="mt-3 block text-sm font-medium text-[#2D336B] cursor-pointer"
            >
              Change Image
            </label>
            {showInput && (
              <InputField
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={(e) => {
                  handleChange("profilePicture", e.target.files[0]);
                  setShowInput(false);
                }}
                className="mt-1 text-sm"
              />
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Patient Name"
              name="userName"
              value={formData.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              required
              disabled={isLoading}
            />

            <InputField
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              max={convertDateFormat(new Date())}
              disabled={isLoading}
              required
            />

            {/* Gender Select */}
            <div>
              <label className="block text-sm font-medium text-[#2D336B]">
                Gender
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                required
                onChange={(e) => handleChange("gender", e.target.value)}
                className="mt-1 block w-full bg-[#FFF2F2] rounded-md border-[#A9B5DF] shadow-sm p-2 text-[#2D336B]"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other" >Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Blood Group Select */}
            <div>
              <label className="block text-sm font-medium text-[#2D336B]">
                Blood Group
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="bloodGroup"
                required
                value={formData.bloodGroup}
                onChange={(e) => handleChange("bloodGroup", e.target.value)}
                className="mt-1 block w-full rounded-md border-[#A9B5DF] shadow-sm p-2 text-[#2D336B] bg-[#FFF2F2]"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <InputField
              label="Height (cm)"
              type="number"
              name="height"
              value={formData.height}
              required
              onChange={(e) => handleChange("height", e.target.value)}
            />

            <InputField
              label="Weight (kg)"
              type="number"
              name="weight"
              value={formData.weight}
              required
              onChange={(e) => handleChange("weight", e.target.value)}
            />

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-[#2D336B]">
                Marital Status
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                required
                onChange={(e) => handleChange("maritalStatus", e.target.value)}
                className="mt-1 block w-full rounded-md border-[#A9B5DF] shadow-sm p-2 text-[#2D336B] bg-[#FFF2F2]"
              >
                <option value="">Select marital status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <InputField
              label="Occupation"
              type="text"
              name="occupation"
              required
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
            />

            <InputField
              label="Street Address"
              name="address.street"
              value={formData.address.street}
              required
              onChange={(e) => handleChange("address.street", e.target.value)}
            />

            <InputField
              label="City"
              name="address.city"
              value={formData.address.city}
              required
              onChange={(e) => handleChange("address.city", e.target.value)}
            />

            <InputField
              label="State"
              name="address.state"
              value={formData.address.state}
              required
              onChange={(e) => handleChange("address.state", e.target.value)}
            />

            <InputField
              label="Zip Code"
              name="address.zipCode"
              value={formData.address.zipCode}
              required
              onChange={(e) => handleChange("address.zipCode", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-[#2D336B] text-white py-2 rounded-lg hover:bg-[#7886C7] transition-all"
            disabled={isLoading}
          >
            {isUpdateForm ? "Update" : "Create"}
          </button>

          {error && <p className="mt-3 text-center text-red-600">{error}</p>}
        </fieldset>
      </form>
    </div></div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.demographic.isLoading,
  error: state.demographic.error,
  demographicDetails: state.demographic.demographicDetails,
});

export default connect(mapStateToProps, {
  addDemographicDetails,
  updateDemographicDetails,
  fetchDemographicDetails,
})(DemographicForm);
