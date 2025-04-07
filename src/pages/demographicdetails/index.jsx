import React, { useState, useEffect } from "react";
import InputField from "../../components/inputField";
import { connect, useSelector } from "react-redux";

import {
  addDemographicDetails,
  updateDemographicDetails,
  fetchDemographicDetails,
} from "./action";

// Add this helper function to convert ISO date to dd/mm/yyyy format
const convertIsoDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const bufferToImage = (buffer, mimeType = "image/jpeg") => {
  if (!buffer || buffer.length === 0) return "";

  // Ensure it's converted to Uint8Array
  const uint8Array = new Uint8Array(buffer);
  console.log(uint8Array);
  const blob = new Blob([uint8Array], { type: mimeType });
  console.log("blob",blob,URL.createObjectURL(blob) );
  return URL.createObjectURL(blob);
};;


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
  // console.log(demographicId);
  // Initialize form data with default values
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    // lastName: "",
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

  // Fetch demographic details when component mounts
  useEffect(() => {
    fetchDemographicDetails();
  }, [fetchDemographicDetails]);
  // console.log(formData);
  //  console.log(convertIsoDate(data.dateOfBirth));
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

        // setTimeout(() => {
        //   const buffer = demographicData?.profilePicture?.data;
        //   console.log(buffer);
        //   const imageUrl = buffer ? bufferToImage(buffer,demographicData?.profilePictureType) : "";
        //   console.log(imageUrl);
        //   setFormData((prev) => ({
        //     ...prev,
        //     profilePicture: imageUrl,
        //   }));
        // }, 300);

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
          profilePicture : demographicData?.profilePicture || "",
        });
        setIsUpdateForm(true);
        const buffer = demographicData?.profilePicture?.data;
        const mimeType = demographicData?.profilePictureType || "image/jpeg";
  
        if (buffer && Array.isArray(buffer)) {
          const uint8Array = new Uint8Array(buffer);
          const blob = new Blob([uint8Array], { type: mimeType });
          const imageUrl = URL.createObjectURL(blob);
  
          setPreview(imageUrl);}
      }
    }
  }, [demographicDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithIsoDate = {
      ...formData,
      dateOfBirth: convertDateToIso(formData.dateOfBirth),
    };

    // If this is an update form, use updateDemographicDetails
    // If this is a create form, use addDemographicDetails
    if (isUpdateForm) {
      updateDemographicDetails(demographicId, formDataWithIsoDate);
    } else {
      addDemographicDetails(formData);
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
    if (name.includes('address')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name === "profilePicture") {
      handleFilePreview(value);
     
     setFormData(prev => ({
      ...prev,
      profilePicture : value
     }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (isLoading) {
    return "loading.....";
  }
// console.log("formData", formData);




  return (
    <div className="max-w-2xl mx-auto pt-20">
      <form onSubmit={handleSubmit} disabled={isLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Patient Name"
            name="firstName"
            value={formData.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
            required
            disabled={isLoading}
          />

          <InputField
            label="Profile Image"
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={(e) => handleChange("profilePicture", e.target.files[0])}
          />
         {preview && (
        <img src={preview} alt="Profile Preview" style={{ maxWidth: '100px' }} />
      )}
          
          <InputField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border border-gray-300 rounded"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={(e) => handleChange("bloodGroup", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border border-gray-300 rounded"
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
            onChange={(e) => handleChange("height", e.target.value)}
          />

          <InputField
            label="Weight (kg)"
            type="number"
            name="weight"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={(e) => handleChange("maritalStatus", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border border-gray-300 rounded"
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
            value={formData.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
          />

          <InputField
            label="Street Address"
            name="address.street"
            value={formData.address.street}
            onChange={(e) => handleChange("address.street", e.target.value)}
          />

          <InputField
            label="City"
            name="address.city"
            value={formData.address.city}
            onChange={(e) => handleChange("address.city", e.target.value)}
          />

          <InputField
            label="State"
            name="address.state"
            value={formData.address.state}
            onChange={(e) => handleChange("address.state", e.target.value)}
          />

          <InputField
            label="Zip Code"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={(e) => handleChange("address.zipCode", e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isUpdateForm ? "Update" : "Create"}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
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
