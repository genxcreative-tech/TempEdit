/* src/Hero.js */

import React from 'react';

const Hero = ({ content, onEdit }) => (
  <section style={{ textAlign: 'center', padding: '50px', backgroundImage: `url(${content.heroImage || ''})`, backgroundSize: 'cover' }}>
    <h1 onClick={() => onEdit('heroTitle')} style={{ cursor: 'pointer' }}>
      {content.heroTitle || 'Welcome to Our Website'}
    </h1>
    <p onClick={() => onEdit('heroSubtitle')} style={{ cursor: 'pointer' }}>
      {content.heroSubtitle || 'This is a description for your hero section.'}
    </p>
  </section>
);

export default Hero;
