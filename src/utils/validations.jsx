export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (password.length < 8) return "Password must be at least 8 characters";
  if (!passwordRegex.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return "";
};

export const validateName = (
  value,
  message = "Name must be at least 2 characters"
) => {
  if (!value) return message;
  if (value.length < 2) return message;
  return "";
};

export const validateMobileNumber = (mobileNumber) => {
  // Indian mobile number validation (10 digits starting with 6,7,8,9)
  const mobileRegex = /^[6789]\d{9}$/;

  if (!mobileNumber) return "Mobile number is required";
  if (mobileNumber.length !== 10) return "Mobile number must be 10 digits";
  if (!mobileRegex.test(mobileNumber)) {
    return "Must be a valid 10-digit mobile number start with 6,7,8,9 ";
  }
  return "";
};

export const validateDOB = (dob) => {
  
  if (!dob) return "Date of Birth is required";
  
  const currentDate = new Date();
  const selectedDate = new Date(dob);

  if (selectedDate > currentDate) {
    return "Date of Birth cannot be in the future";
  }

  return "";
};

const validateNumber = (value, message = "Valid number is required") => {
  return value && (isNaN(value) || Number(value) <= 0) ? message : "";
};

export const validateRequired = (value, required) => {
  if (required && !value) {
    return "This field is required";
  }
  return "";
};

export const validateZipcode = (zipcode) => {
  const zipcodeRegex = /^\d{6}$/; // For Indian zipcode (6 digits)
  if (!zipcode) return "Zipcode is required";
  if (!zipcodeRegex.test(zipcode)) {
    return "Invalid zipcode (must be 6 digits)";
  }
  return "";
};

export const validateProfilePicture = (file) => {

  if (!file) {
    return "";
  } else if (file.type === "Buffer") {
    return "";
  } else {
    if (file.size > 1048576) {
      return "Profile picture must be less than 1 MB";
    }

    // Check file type (only JPG/JPEG)
    if (
      !file.type.startsWith("image/jpeg") &&
      !file.type.startsWith("image/jpg") &&
      file
    ) {
      return "Only JPG/JPEG file formats are allowed";
    }
  }

  return "";
};

// Helper validation functions
const validateAddress = (value, message = "Address field is required") => {
  return !value || value.trim().length === 0 ? message : "";
};

// Helper to clean empty nested objects
const cleanErrors = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      cleanErrors(obj[key]);
      // If the nested object is now empty, delete it
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    } else if (!obj[key]) {
      delete obj[key];
    }
  });
};

export const validateForm = (formData, formType) => {
  const errors = {};

  switch (formType) {
    case "login":
      errors.emailOrUsername = validateEmail(formData.emailOrUsername);
      errors.passWord = validatePassword(formData.passWord);
      break;

    case "signup":
      errors.userName = validateName(
        formData.userName,
        "Username must be at least 2 characters"
      );
      errors.email = validateEmail(formData.email);
      errors.passWord = validatePassword(formData.passWord);
      errors.mobileNumber = validateMobileNumber(formData.mobileNumber);
      break;

    case "demographic":
      // Validate name
      errors.userName = validateName(
        formData.userName,
        "Patient name must be at least 2 characters"
      );

      // Validate date of birth
      errors.dateOfBirth = validateDOB(formData.dateOfBirth);

      // Validate gender
      errors.gender = formData.gender === "" ? "Gender is required" : "";

      // Validate blood group
      errors.bloodGroup =
        formData.bloodGroup === "" ? "Blood Group is required" : "";

      // Add marital status validation
      errors.maritalStatus =
        formData.maritalStatus === "" ? "Marital status is required" : "";

      // Validate height
      errors.height = validateNumber(
        formData.height,
        "Valid height is required"
      );

      // Validate weight
      errors.weight = validateNumber(
        formData.weight,
        "Valid weight is required"
      );

      // Validate occupation
      errors.occupation = validateName(
        formData.occupation,
        "Occupation must be at least 2 characters"
      );

      // Validate address
      if (formData.address) {
        errors.address = {};
        // Street validation
        errors.address.street = validateAddress(
          formData.address.street,
          "Street address is required"
        );

        // City validation
        errors.address.city = validateAddress(
          formData.address.city,
          "City is required"
        );

        // State validation
        errors.address.state = validateAddress(
          formData.address.state,
          "State is required"
        );

        // Zip code validation
        errors.address.zipCode = validateZipcode(formData.address.zipCode);
      }

      // Validate profile picture
      errors.profilePicture = validateProfilePicture(formData.profilePicture);
      break;

    default:
      break;
  }

  cleanErrors(errors);

  return errors;
};
