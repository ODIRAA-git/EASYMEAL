import React from "react";
import "../CSS/SignupForm.css";
const SignUPStepTwo = ({ formData, handleChange, prevStep }) => {
  const { street, houseNumber, postalCode, city, flatNumber, roomNumber, termsAccepted } = formData;

  return (
    <div className="form-step">
      <label>Street:</label>
      <input type="text" name="street" value={street} onChange={handleChange} required />

      <label>House Number:</label>
      <input type="text" name="houseNumber" value={houseNumber} onChange={handleChange} required />

      <label>Postal Code:</label>
      <input type="text" name="postalCode" value={postalCode} onChange={handleChange} required />

      <label>City:</label>
      <input type="text" name="city" value={city} onChange={handleChange} required />

      <label>Flat Number (optional):</label>
      <input type="text" name="flatNumber" value={flatNumber} onChange={handleChange} />

      <label>Room Number (optional):</label>
      <input type="text" name="roomNumber" value={roomNumber} onChange={handleChange} />
 cvcx
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={termsAccepted}
          onChange={handleChange}
        />
        <span>I agree to the terms and conditions</span>
      </div>

      <div className="button-group">
        <button type="button" className="back-btn" onClick={prevStep}>Back</button>
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default SignUPStepTwo;
