/* src/ContactForm.js */

import React from 'react';

const ContactForm = ({ content, onEdit }) => (
  <section style={{ padding: '30px' }}>
    <h2 onClick={() => onEdit('contactTitle')} style={{ cursor: 'pointer' }}>
      {content.contactTitle || 'Contact Us'}
    </h2>
    <form>
      <label>
        Name:
        <input type="text" placeholder="Your Name" />
      </label>
      <label>
        Email:
        <input type="email" placeholder="Your Email" />
      </label>
      <label>
        Message:
        <textarea placeholder="Your Message" />
      </label>
      <button type="submit">Send</button>
    </form>
  </section>
);

export default ContactForm;
