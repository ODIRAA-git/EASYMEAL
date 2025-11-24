import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../supabase";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error(error.message);
      alert(error.message);
    } else {
      console.log("Signup success:", data);
      alert("Signup successful! Please check your email to confirm.");
      navigate('/dashboard'); // redirect after successful signup
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4"
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Join EasyMeal</h1>
          <p className="text-blue-100 text-xs">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 hover:shadow-lg mt-4"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-xs pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;