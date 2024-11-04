/* src/Services.js */

import React from 'react';

const Services = ({ content, onEdit }) => (
  <section style={{ padding: '30px' }}>
    <h2 onClick={() => onEdit('servicesTitle')} style={{ cursor: 'pointer' }}>
      {content.servicesTitle || 'Our Services'}
    </h2>
    <div style={{ display: 'flex', gap: '20px' }}>
      <div onClick={() => onEdit('service1')} style={{ cursor: 'pointer' }}>
        <h3>{content.service1Title || 'Service 1'}</h3>
        <p>{content.service1Description || 'Description for Service 1.'}</p>
      </div>
      <div onClick={() => onEdit('service2')} style={{ cursor: 'pointer' }}>
        <h3>{content.service2Title || 'Service 2'}</h3>
        <p>{content.service2Description || 'Description for Service 2.'}</p>
      </div>
    </div>
  </section>
);

export default Services;
