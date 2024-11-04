/* src/Navbar.js */

import React from 'react';

const Navbar = ({ content, onEdit }) => (
  <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
    <span onClick={() => onEdit('navbarTitle')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
      {content.navbarTitle || 'Your Brand'}
    </span>
  </nav>
);

export default Navbar;
