import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../CSS/LoginForm.css";

const DEMO_EMAIL = "demo@easymeal.com";
const DEMO_PASSWORD = "easy0123";

const LoginForm = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin(username, password);
  };

  const handleGuestLogin = () => {
    setUsername(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    submitLogin(DEMO_EMAIL, DEMO_PASSWORD);
  };

  const submitLogin = async (username, password) => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username or email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        setErrors({ general: error.message });
        setLoading(false);
        return;
      }

      // Login successful
      if (onLogin) {
        onLogin(data.user);
      }

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: "An error occurred during login" });
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="modern-login-container">
      <div className="login-header">
        <div className="login-icon">
          <i className="bi bi-person-circle"></i>
        </div>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form fade-in">
        {/* General Error Message */}
        {errors.general && (
          <div style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '5px',
            color: '#c33',
            fontSize: '0.9rem'
          }}>
            {errors.general}
          </div>
        )}

        {/* Username or Email Input */}
        <div className="form-group">
          <label className="form-label">Username or Email</label>
          <div className="input-wrapper">
            <i className="bi bi-person-fill input-icon"></i>
            <input
              type="text"
              className={`modern-input ${errors.username ? 'error' : ''}`}
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <i className="bi bi-lock-fill input-icon"></i>
            <input
              type="password"
              className={`modern-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="form-options">
          <div className="remember-me-wrapper">
            <input
              className="remember-checkbox"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="remember-label">
              Remember me
            </label>
          </div>
          <a href="#" className="forgot-password-link">Forgot Password?</a>
        </div>

        {/* Submit and Guest Buttons */}
        <div className="login-actions">
          <button type="submit" className="modern-btn btn-primary" disabled={loading}>
            <i className="bi bi-box-arrow-in-right"></i>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <button
            type="button"
            className="modern-btn btn-guest"
            onClick={handleGuestLogin}
            disabled={loading}
          >
            <i className="bi bi-person-badge"></i>
            Continue as Guest
          </button>
        </div>

        {/* Divider */}
        <div className="divider">
          <span>or continue with</span>
        </div>

        {/* Social Login Buttons */}
        <div className="social-login-buttons">
          <button
            type="button"
            className="social-btn facebook-btn"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <i className="bi bi-facebook"></i>
          </button>
          <button
            type="button"
            className="social-btn google-btn"
            onClick={() => handleSocialLogin('Google')}
          >
            <i className="bi bi-google"></i>
          </button>
          <button
            type="button"
            className="social-btn twitter-btn"
            onClick={() => handleSocialLogin('Twitter')}
          >
            <i className="bi bi-twitter"></i>
          </button>
        </div>

        {/* Signup Link */}
        <div className="signup-link">
          Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup && onSwitchToSignup(); }}>Sign up now</a>
        </div>
      </form>

      {/* Demo Credentials Note */}
      <p className="demo-note">
        Recruiter or reviewer? Use <strong>{DEMO_EMAIL}</strong> / <strong>{DEMO_PASSWORD}</strong> to log in.
      </p>
    </div>
  );
};

export default LoginForm;
