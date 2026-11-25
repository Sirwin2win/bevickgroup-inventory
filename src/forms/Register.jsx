
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.jpg";
import "./style.css";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
 
  const [showPassword, setShowPassword] = useState(false);
 const initialForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await dispatch(register(formData)).unwrap();

    console.log("Registration successful:", response);

    // Clear form
    setFormData(initialForm);

    // Redirect to pending activation page
    navigate("/account-pending");

  } catch (error) {
    console.error("Registration failed:", error);
  }
};


  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo-wrapper">
          <img
            src={logo}
            alt="Company Logo"
            className="auth-logo"
          />
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1 className="text-center">Create Account</h1>
          <p className="text-center">Register to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">

          <div className="auth-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              autoComplete="tel"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              autoComplete="email"
              required
            />
          </div>

<div className="auth-field">
  <label htmlFor="password">Password</label>

  <div className="password-input-wrapper">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Create a password"
      autoComplete="new-password"
      minLength={8}
      required
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>


          <button type="submit" className="auth-submit">
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className="auth-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}
