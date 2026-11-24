import { useState } from "react";
import { Eye, EyeOff, MarginBottom, UserPlus } from "lucide-react";
import { register } from "../features/auth/authSlice";import logo from '../assets/logo.jpg'
import { MarginLeft } from 'lucide-react'
import './style.css'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    alert("Registration successful!");
  };
  return (
  <div className="auth-container">

    <div className="auth-card">

      <img
        src={logo}
        alt="Company Logo"
        className="auth-logo"
      />

      <h1 className="auth-title">
        Welcome Back!
      </h1>

      <p className="auth-subtitle">
        Login to continue to your account
      </p>

      <form onSubmit={handleSubmit} className="auth-form">

        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  </div>
);
}

export default Login