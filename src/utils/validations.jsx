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
  
  export const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    return "";
  };
  
  export const validateMobileNumber = (mobileNumber) => {
    // Indian mobile number validation (10 digits starting with 6,7,8,9)
    const mobileRegex = /^[6789]\d{9}$/;
    
    if (!mobileNumber) return "";
    if (mobileNumber.length !== 10) return "Mobile number must be 10 digits";
    if (!mobileRegex.test(mobileNumber)) {
        return "Must be a valid 10-digit mobile number start with 6,7,8,9 ";
    }
    return "";
};

  export const validateForm = (formData, formType) => {
    const errors = {};
  
    switch (formType) {
      case 'login':
        errors.emailOrUsername = validateEmail(formData.emailOrUsername);
        errors.passWord = validatePassword(formData.passWord);
        break;
        
      case 'signup':
        errors.userName = validateName(formData.userName);
        errors.email = validateEmail(formData.email);
        errors.passWord = validatePassword(formData.passWord);
        errors.mobileNumber = validateMobileNumber(formData.mobileNumber);
        break;
      
      default:
        break;
    }
  
    // Remove empty error messages
    Object.keys(errors).forEach(key => {
      if (!errors[key]) delete errors[key];
    });
  
    return errors;
  };