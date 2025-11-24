import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = () => {
    setShowLoginModal(false);
  };

  const handleSignupComplete = () => {
    setShowSignupModal(false);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // Don't render if navigating to dashboard
  if (user) {
    return null;
  }

  return (
    <>
      <Navbar
        onOpenLogin={() => setShowLoginModal(true)}
        onOpenSignup={() => setShowSignupModal(true)}
      />

      {/* Modals */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginForm onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
      </Modal>

      <Modal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <SignupForm onSignupComplete={handleSignupComplete} onSwitchToLogin={switchToLogin} />
      </Modal>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        textAlign: 'center',
        backgroundImage: 'url(/src/assets/food3.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        position: 'relative'
      }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        width: '90%',
        maxWidth: '600px',
        padding: '2rem 1rem',
        position: 'relative',
        border: "2px solid #98a5b4ff",
        boxShadow: '0 0 12px rgba(0, 150, 255, 0.7)',
        borderRadius: '10px'
      }}>
       <h1 style={{
         fontSize: 'clamp(1.5rem, 5vw, 3rem)',
         marginBottom: '1rem',
         color: '#333',
         wordWrap: 'break-word',
         width: '100%'
       }}>
         Welcome to <span style={{ letterSpacing: 'clamp(2px, 1vw, 10px)', display: 'inline-block' }}>EASYMEAL</span>
       </h1>

        <p style={{
          fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
          color: '#666',
          maxWidth: '100%',
          marginBottom: '1.5rem',
          padding: '0 0.5rem'
        }}>
          Your personal meal planning assistant. Sign up or log in to get started!
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            style={{
              padding: '0.75rem 2rem',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: "4px",
            }}
            onClick={() => setShowLoginModal(true)}
          >
            Get Started
          </button>
        </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Home;
