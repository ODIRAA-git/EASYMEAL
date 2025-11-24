import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { supabase } from '../supabase';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.first_name || 'User',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    bio: user?.user_metadata?.bio || ''
  });

  // Sample search history
  const [searchHistory] = useState([
    { id: 1, query: 'chicken, tomato, garlic', date: '2024-01-20', results: 15 },
    { id: 2, query: 'pasta, cheese, basil', date: '2024-01-19', results: 22 },
    { id: 3, query: 'avocado, bread, eggs', date: '2024-01-18', results: 8 },
    { id: 4, query: 'salmon, lemon, dill', date: '2024-01-17', results: 12 }
  ]);

  const handleSave = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          bio: formData.bio
        }
      });

      if (error) throw error;
      alert('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const stats = [
    { label: 'Recipes Viewed', value: '47', icon: '📖' },
    { label: 'Searches', value: '23', icon: '🔍' },
    { label: 'Favorites', value: '12', icon: '❤️' },
    { label: 'Days Active', value: '15', icon: '📅' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: darkMode ? 'none' : 'url(/src/assets/food3.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: darkMode ? '#1a1a1a' : 'transparent',
      zIndex: 9999
    }}>
      <DashboardNavbar />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 'clamp(1rem, 3vw, 2rem)',
        backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(249, 250, 251, 0.85)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header Section */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #1e5a9e 0%, #764ba2 100%)',
            borderRadius: 'clamp(12px, 2vw, 16px)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: 'clamp(1rem, 3vw, 2rem)',
            color: 'white',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              {/* Avatar */}
              <div style={{
                width: 'clamp(80px, 20vw, 120px)',
                height: 'clamp(80px, 20vw, 120px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 'bold',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                border: '4px solid white'
              }}>
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </div>

              {/* User Info */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h1 style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  wordWrap: 'break-word'
                }}>
                  {formData.firstName} {formData.lastName}
                </h1>
                <p style={{
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                  opacity: 0.9,
                  marginBottom: '1rem',
                  wordWrap: 'break-word'
                }}>
                  ✉️ {formData.email}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    padding: 'clamp(0.375rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    🌟 Premium Member
                  </span>
                  <span style={{
                    padding: 'clamp(0.375rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    📍 Member since Jan 2024
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setEditMode(!editMode)}
                style={{
                  padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(1.5rem, 4vw, 2rem)',
                  backgroundColor: editMode ? '#f44336' : 'white',
                  color: editMode ? 'white' : '#667eea',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  whiteSpace: 'nowrap'
                }}
              >
                {editMode ? '✕ Cancel' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            marginBottom: 'clamp(1rem, 3vw, 2rem)'
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: darkMode ? '#2d2d2d' : 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: darkMode ? '#fff' : '#333',
                  marginBottom: '0.25rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#aaa' : '#666'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)'
          }}>
            {/* Personal Information Card */}
            <div style={{
              backgroundColor: darkMode ? '#2d2d2d' : 'white',
              borderRadius: 'clamp(12px, 2vw, 16px)',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                fontWeight: 'bold',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                color: darkMode ? '#fff' : '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                👤 Personal Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: darkMode ? '#aaa' : '#666'
                  }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      backgroundColor: darkMode ? '#1a1a1a' : editMode ? 'white' : '#f5f5f5',
                      color: darkMode ? '#fff' : '#333',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: darkMode ? '#aaa' : '#666'
                  }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      backgroundColor: darkMode ? '#1a1a1a' : editMode ? 'white' : '#f5f5f5',
                      color: darkMode ? '#fff' : '#333',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: darkMode ? '#aaa' : '#666'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5',
                      color: darkMode ? '#888' : '#999',
                      outline: 'none',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: darkMode ? '#aaa' : '#666'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="+1 (555) 123-4567"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      backgroundColor: darkMode ? '#1a1a1a' : editMode ? 'white' : '#f5f5f5',
                      color: darkMode ? '#fff' : '#333',
                      outline: 'none'
                    }}
                  />
                </div>

                {editMode && (
                  <button
                    onClick={handleSave}
                    style={{
                      padding: '0.875rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      marginTop: '1rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
                  >
                    💾 Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Settings Card */}
            <div style={{
              backgroundColor: darkMode ? '#2d2d2d' : 'white',
              borderRadius: 'clamp(12px, 2vw, 16px)',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                fontWeight: 'bold',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                color: darkMode ? '#fff' : '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ⚙️ Settings & Preferences
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Dark Mode Toggle */}
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      marginBottom: '0.25rem',
                      color: darkMode ? '#fff' : '#333'
                    }}>
                      🌙 Dark Mode
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#aaa' : '#666'
                    }}>
                      Toggle dark theme
                    </div>
                  </div>
                  <label style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '60px',
                    height: '34px'
                  }}>
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: darkMode ? '#4CAF50' : '#ccc',
                      transition: '0.4s',
                      borderRadius: '34px'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '26px',
                        width: '26px',
                        left: darkMode ? '30px' : '4px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        transition: '0.4s',
                        borderRadius: '50%'
                      }} />
                    </span>
                  </label>
                </div>

                {/* Notifications */}
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      marginBottom: '0.25rem',
                      color: darkMode ? '#fff' : '#333'
                    }}>
                      🔔 Email Notifications
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#aaa' : '#666'
                    }}>
                      Receive recipe updates
                    </div>
                  </div>
                  <label style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '60px',
                    height: '34px'
                  }}>
                    <input
                      type="checkbox"
                      defaultChecked
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: '#4CAF50',
                      transition: '0.4s',
                      borderRadius: '34px'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '26px',
                        width: '26px',
                        left: '30px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        transition: '0.4s',
                        borderRadius: '50%'
                      }} />
                    </span>
                  </label>
                </div>

                {/* Language */}
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: darkMode ? '#fff' : '#333'
                  }}>
                    🌍 Language
                  </div>
                  <select style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: darkMode ? '#2d2d2d' : 'white',
                    color: darkMode ? '#fff' : '#333',
                    outline: 'none',
                    cursor: 'pointer'
                  }}>
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                {/* Change Password Button */}
                <button style={{
                  padding: '0.875rem',
                  backgroundColor: darkMode ? '#3d3d3d' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s'
                }}>
                  🔒 Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Search History Section */}
          <div style={{
            backgroundColor: darkMode ? '#2d2d2d' : 'white',
            borderRadius: 'clamp(12px, 2vw, 16px)',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
            marginTop: 'clamp(1rem, 3vw, 2rem)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                fontWeight: 'bold',
                color: darkMode ? '#fff' : '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                🕐 Recent Search History
              </h2>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: '#f44336',
                border: `1px solid #f44336`,
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                Clear History
              </button>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {searchHistory.map((search) => (
                <div
                  key={search.id}
                  style={{
                    padding: '1rem',
                    backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#2a2a2a' : '#e9ecef'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#1a1a1a' : '#f8f9fa'}
                >
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: darkMode ? '#fff' : '#333',
                      marginBottom: '0.25rem'
                    }}>
                      🔍 {search.query}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#aaa' : '#666'
                    }}>
                      {search.date} • {search.results} results found
                    </div>
                  </div>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    Search Again
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div style={{
            backgroundColor: darkMode ? '#2d2d2d' : 'white',
            borderRadius: 'clamp(12px, 2vw, 16px)',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
            marginTop: 'clamp(1rem, 3vw, 2rem)',
            marginBottom: 'clamp(1rem, 3vw, 2rem)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: `1px solid ${darkMode ? '#444' : '#ffe6e6'}`
          }}>
            <h2 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 'bold',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              color: darkMode ? '#fff' : '#333'
            }}>
              ⚠️ Danger Zone
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.25rem',
              backgroundColor: darkMode ? '#3d1e1e' : '#fff5f5',
              borderRadius: '12px',
              border: `1px solid ${darkMode ? '#5d2e2e' : '#ffcccc'}`
            }}>
              <div>
                <div style={{
                  fontWeight: '600',
                  color: '#f44336',
                  marginBottom: '0.25rem'
                }}>
                  Delete Account
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#aaa' : '#666'
                }}>
                  Permanently delete your account and all data
                </div>
              </div>
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9375rem'
              }}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
