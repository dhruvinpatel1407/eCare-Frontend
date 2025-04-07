// Client/src/pages/signup/index.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputField from '../../components/inputField';
import { validateForm } from '../../utils/validations';
import { showMessage } from '../../utils/ToastMessage/ShowMessage';
import { signup } from './action';
import { useSelector, useDispatch } from 'react-redux';

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    passWord: '',
    mobileNumber: ''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.signup);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, 'signup');
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showMessage("error","Please fill in all required fields");
      return;
    }

    dispatch(signup(formData,navigate));
    setTimeout(() => {
      setFormData({
        userName: '',
        email: '',
        passWord: '',
        mobileNumber: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            error={errors.userName}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="passWord"
            value={formData.passWord}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            error={errors.passWord}
          />
          <InputField
            label="Mobile Number"
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number (optional)"
            error={errors.mobileNumber}
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;