import React, { useState } from "react";

function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  // Scroll smoothly to top when footer is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '1rem',
        backgroundColor: isHovered ? 'rgba(22, 74, 122, 0.9)' : 'rgba(30, 90, 158, 0.9)',
        color: 'white',
        textAlign: 'center',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
      }}
      title="Click to scroll to top"
    >
      © {new Date().getFullYear()} Madu Odiraa Perpetua. All rights reserved.
    </footer>
  );
}

export default Footer;
