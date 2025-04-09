import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputField from '../../components/inputField';
import { validateForm } from '../../utils/validations';
import { showMessage } from '../../utils/ToastMessage/ShowMessage';
import { loginaction, firebaseLoginAction } from './action';
import { useSelector, useDispatch } from 'react-redux';
import GoogleButton from 'react-google-button'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import * as actions from "./action";
import { auth, provider } from '../../config/firebase';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    passWord: ''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.login);

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
 
  const handleFirebaseLogin = async () => {
   
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); 
      
      // Dispatch action to update user state
      dispatch(firebaseLoginAction({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }, navigate));
    } catch (error) {
      
      dispatch({
        type: actions.LOGIN_FAILURE,
        payload: error.message
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, 'login');
   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showMessage("error" , "Please fill in all required fields");
      return;
    }
    dispatch(loginaction(formData, navigate));
    setTimeout(() => {
      setFormData({
        emailOrUsername: '',
        passWord: ''
      });
    }, 2000);
   
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-center text-4xl font-bold text-blue-800">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm">Log in to book your appointment</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            error={errors.emailOrUsername}
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center text-sm text-gray-500">or</div>
           <div className="flex justify-center"> <GoogleButton onClick={handleFirebaseLogin} /></div>
         
        </form>

        <div className="text-center text-sm text-gray-600">
          New here?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;