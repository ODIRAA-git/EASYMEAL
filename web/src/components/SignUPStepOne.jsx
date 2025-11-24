import React from "react";
import "../CSS/SignupForm.css";

const SignUPStepOne = ({ formData, handleChange, nextStep }) => {
  const { email, firstName, lastName, password, confirmPassword } = formData;

  const handleNext = (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    nextStep();
  };

  return (
    <div className="form-step">
      <label>Email Address:</label>
      <input type="email" name="email" value={email} onChange={handleChange} required />

      <label>First Name:</label>
      <input type="text" name="firstName" value={firstName} onChange={handleChange} required />

      <label>Last Name:</label>
      <input type="text" name="lastName" value={lastName} onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" value={password} onChange={handleChange} required />

      <label>Confirm Password:</label>
      <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />

      <button className="next-btn" onClick={handleNext}>Next</button>
    </div>
  );
};

export default SignUPStepOne;
