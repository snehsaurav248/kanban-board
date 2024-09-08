// src/components/Logo.js
import React from 'react';
import logo from '../assets/images/board-infinity-logo.png';

const Logo = () => {
  return (
    <div className="fixed top-0 left-0 p-4 z-50">
      <img src={logo} alt="Board Infinity Logo" className="w-24 h-auto" />
    </div>
  );
};

export default Logo;
