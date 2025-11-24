import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { supabase } from '../supabase';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
      backgroundColor: '#1e5a9e',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}>
      {/* Logo/Brand */}
      <div
        onClick={() => navigate('/')}
        style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          fontWeight: 'bold',
          letterSpacing: 'clamp(2px, 1vw, 5px)',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        EASYMEAL<span className="h1-span" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 1rem)' }}>No.1 Recipe Engine</span>
      </div>

      {/* Right side - User Profile & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}
            title={user?.email}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: 0,
              backgroundColor: darkMode ? '#2a2a2a' : 'white',
              boxShadow: darkMode ? '0 4px 6px rgba(255,255,255,0.1)' : '0 4px 6px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              minWidth: '200px',
              overflow: 'hidden',
              zIndex: 1001
            }}>
              <div
                onClick={handleViewProfile}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  borderBottom: darkMode ? '1px solid #444' : '1px solid #eee',
                  transition: 'background-color 0.2s',
                  color: darkMode ? '#fff' : '#000'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = darkMode ? '#3a3a3a' : '#f5f5f5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = darkMode ? '#2a2a2a' : 'white'}
              >
                👤 View Profile
              </div>
              <div
                onClick={handleLogout}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  color: '#f44336',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = darkMode ? '#3a3a3a' : '#f5f5f5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = darkMode ? '#2a2a2a' : 'white'}
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
