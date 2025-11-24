import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../supabase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    });

    if (error) {
      console.error(error.message);
      alert(error.message);
    } else {
      console.log("Login success:", data);
      alert("Login successful!");
      navigate('/dashboard'); // redirect to dashboard
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome Back!</h1>
          <p className="text-blue-100 text-xs">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3">
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

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 hover:shadow-lg mt-4"
          >
            Sign In
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-600 text-xs pt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;