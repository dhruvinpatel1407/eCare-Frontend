// Client/src/pages/signup/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField";
import { validateForm } from "../../utils/validations";
import { showMessage } from "../../utils/ToastMessage/ShowMessage";
import { signup } from "./action";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    passWord: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.signup);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, "signup");

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showMessage("error", "Please fill in all required fields");
      return;
    }

    dispatch(signup(formData, navigate));
    setTimeout(() => {
      setFormData({
        userName: "",
        email: "",
        passWord: "",
        mobileNumber: "",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#A9B5DF] via-white to-[#A9B5DF]">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div>
          <h2 className="text-center text-4xl font-bold text-[#2D336B]">
            Create Account
          </h2>
          <p className="text-center text-gray-600 text-base mt-1">
            Sign up to book your doctor appointments easily
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter your mobile number"
            required
            error={errors.mobileNumber}
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#7886C7] hover:bg-[#2D336B] text-white font-semibold rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-base text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-[#7886C7] hover:text-[#2D336B] font-medium transition duration-150"
          >
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
