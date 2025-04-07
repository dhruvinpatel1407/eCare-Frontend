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
    console.log("button clicked")
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); 
      console.log(result);
      // Dispatch action to update user state
      dispatch(firebaseLoginAction({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }, navigate));
    } catch (error) {
      console.log(error);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
        <form onSubmit={handleSubmit}>
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
            type="text"
            name="passWord"
            value={formData.passWord}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            error={errors.passWord}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <GoogleButton onClick={handleFirebaseLogin}/>
        
        </form>
      </div>
    </div>
  );
};

export default Login;