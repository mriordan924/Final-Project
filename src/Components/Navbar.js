import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile/your-username">Profile</Link>
      <Link to="/register">Create Account</Link>
    </nav>
  );
}

export default Navbar;


