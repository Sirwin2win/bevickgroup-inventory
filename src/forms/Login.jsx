
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.jpg";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate("/dashboard/overview", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await dispatch(login(formData)).unwrap();

    // Successful login
    navigate("/dashboard", { replace: true });

  } catch (error) {

    if (error.code === "ACCOUNT_PENDING") {
      navigate("/account-pending", { replace: true });
      return;
    }

    if (error.code === "ACCOUNT_SUSPENDED") {
      navigate("/account-suspended", { replace: true });
      return;
    }

    console.error("Login failed:", error);
  }
};

  // Safely extract error message
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "";

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
<div className="password-field">
  <label>Password</label>
  <div className="password-input-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter password"
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
          {errorMessage && (
            <p className="auth-error text-red-500">{errorMessage}</p>
          )}

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-register">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
