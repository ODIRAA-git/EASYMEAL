import React, { useState } from "react";
import "../CSS/SignupForm.css";
import SignUPStepOne from "./SignUPStepOne";
import SignUPStepTwo from "./SignUPStepTwo";
import { supabase } from "../supabase";

const SignupForm = ({ onSignupComplete, onSwitchToLogin }) => {
  // Step management
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");

  // Step 2 fields
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("Germany");

  // Error states
  const [errors, setErrors] = useState({});

  // Handle first form step
  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  // Handle final submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!street) newErrors.street = "Street address is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!zip) newErrors.zip = "ZIP code is required";
    if (!country) newErrors.country = "Country is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      // Get the site URL - use environment variable or current origin
      const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

      console.log("Site URL for redirect:", siteUrl);
      console.log("Environment variable VITE_SITE_URL:", import.meta.env.VITE_SITE_URL);
      console.log("Window origin:", window.location.origin);

      // Create user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: siteUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
            street: street,
            city: city,
            state: state,
            zip: zip,
            country: country,
          }
        }
      });

      if (error) {
        alert(`Signup failed: ${error.message}`);
        return;
      }

      alert("Signup successful! Please check your email to verify your account.");

      if (onSignupComplete) {
        onSignupComplete();
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="modern-signup-container">
      {/* Signup Header */}
      <div className="signup-header">
        <div className="signup-icon">
          <i className="bi bi-person-circle"></i>
        </div>
        <h2 className="signup-title">Welcome to EASYMEAL<span className="signup-subtitle">No.1 Recipe Engine</span></h2>
        
      </div>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <form onSubmit={handleNext} className="signup-form fade-in">
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <div className="input-wrapper">
                  <i className="bi bi-person-fill input-icon"></i>
                  <input
                    type="text"
                    className={`modern-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Last Name</label>
                <div className="input-wrapper">
                  <i className="bi bi-person-fill input-icon"></i>
                  <input
                    type="text"
                    className={`modern-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <i className="bi bi-envelope-fill input-icon"></i>
                <input
                  type="email"
                  className={`modern-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <i className="bi bi-lock-fill input-icon"></i>
                <input
                  type="password"
                  className={`modern-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

           
          </div>

          <button type="submit" className="modern-btn btn-primary">
            Continue
            <i className="bi bi-arrow-right"></i>
          </button>

          {/* Login Link */}
          <div className="signup-link">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin && onSwitchToLogin(); }}>Login</a>
          </div>
        </form>
      )}

      {/* Step 2: Address Information */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="signup-form fade-in">
          <div className="form-section">
            <h3 className="section-title">Address Information</h3>

            <div className="form-group">
              <label className="form-label">Country</label>
              <div className="input-wrapper">
                <i className="bi bi-globe input-icon"></i>
                <select
                  className={`modern-select ${errors.country ? 'error' : ''}`}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Germany">Germany</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Street Address</label>
              <div className="input-wrapper">
                <i className="bi bi-house-fill input-icon"></i>
                <input
                  type="text"
                  className={`modern-input ${errors.street ? 'error' : ''}`}
                  placeholder="Enter your street address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              {errors.street && <span className="error-message">{errors.street}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <div className="input-wrapper">
                  <i className="bi bi-building input-icon"></i>
                  <input
                    type="text"
                    className={`modern-input ${errors.city ? 'error' : ''}`}
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">State / Province</label>
                <div className="input-wrapper">
                  <i className="bi bi-map input-icon"></i>
                  <input
                    type="text"
                    className={`modern-input ${errors.state ? 'error' : ''}`}
                    placeholder="Enter your state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">ZIP / Postal Code</label>
              <div className="input-wrapper">
                <i className="bi bi-mailbox input-icon"></i>
                <input
                  type="text"
                  className={`modern-input ${errors.zip ? 'error' : ''}`}
                  placeholder="Enter your postal code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              {errors.zip && <span className="error-message">{errors.zip}</span>}
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="modern-btn btn-secondary"
              onClick={() => { setStep(1); setErrors({}); }}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>
            <button type="submit" className="modern-btn btn-success">
              Complete Signup
              <i className="bi bi-check-circle"></i>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
