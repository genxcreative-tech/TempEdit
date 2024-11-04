import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Sidebar = ({ content, onUpdate, onAddSection, onRemoveSection }) => {
  const handleServiceUpdate = (index, key, value) => {
    const updatedServices = content.services.map((service, i) =>
      i === index ? { ...service, [key]: value } : service
    );
    onUpdate('services', updatedServices);
  };

  return (
    <div className="sidebar bg-light p-4">
      <h4>Content Editor</h4>

      {/* Hero Section */}
      <div className="mb-4">
        <h5>Hero Section</h5>
        <input
          type="text"
          className="form-control mb-2"
          value={content.hero.text}
          onChange={(e) => onUpdate('hero', { ...content.hero, text: e.target.value })}
        />
        <label className="form-label">Hero Image URL</label>
        <input
          type="text"
          className="form-control mb-2"
          value={content.hero.image}
          onChange={(e) => onUpdate('hero', { ...content.hero, image: e.target.value })}
        />
      </div>

      {/* Services Section */}
      <div className="mb-4">
        <h5>Services Section</h5>
        {content.services.map((service, index) => (
          <div key={index} className="mb-3">
            <label>Service Title</label>
            <input
              type="text"
              className="form-control mb-2"
              value={service.title}
              onChange={(e) => handleServiceUpdate(index, 'title', e.target.value)}
            />

            <label>Description</label>
            <input
              type="text"
              className="form-control mb-2"
              value={service.description}
              onChange={(e) => handleServiceUpdate(index, 'description', e.target.value)}
            />

            <label>Image URL</label>
            <input
              type="text"
              className="form-control mb-2"
              value={service.image}
              onChange={(e) => handleServiceUpdate(index, 'image', e.target.value)}
            />

            <button className="btn btn-danger btn-sm" onClick={() => onRemoveSection('services', index)}>
              Remove Service
            </button>
          </div>
        ))}
        <button className="btn btn-primary mt-2" onClick={() => onAddSection('services')}>
          Add Service
        </button>
      </div>

      {/* Other Sections */}
      <div className="mb-4">
        <h5>About Section</h5>
        <input
          type="text"
          className="form-control mb-2"
          value={content.about.text}
          onChange={(e) => onUpdate('about', { ...content.about, text: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          value={content.about.description}
          onChange={(e) => onUpdate('about', { ...content.about, description: e.target.value })}
        />
      </div>
    </div>
  );
};

const App = () => {
  const [content, setContent] = useState({
    hero: { text: 'Welcome to Our Company', image: 'https://via.placeholder.com/1200x500' },
    about: { text: 'About Us', description: 'Our company has been providing top-notch services for over a decade.' },
    services: [
      { title: 'Web Development', description: 'We build responsive websites.', image: 'https://via.placeholder.com/600x400' },
      { title: 'Mobile Apps', description: 'Get custom mobile apps for your business.', image: 'https://via.placeholder.com/600x400' },
    ],
  });

  const handleUpdate = (section, updatedValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [section]: updatedValue,
    }));
  };

  const handleAddSection = (section) => {
    if (section === 'services') {
      const newService = { title: 'New Service', description: 'Description of new service', image: 'https://via.placeholder.com/600x400' };
      setContent((prevContent) => ({
        ...prevContent,
        [section]: [...prevContent[section], newService],
      }));
    }
  };

  const handleRemoveSection = (section, index) => {
    if (section === 'services') {
      setContent((prevContent) => ({
        ...prevContent,
        [section]: prevContent[section].filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar content={content} onUpdate={handleUpdate} onAddSection={handleAddSection} onRemoveSection={handleRemoveSection} />

      {/* Main Content */}
      <div className="main-content p-4">
        {/* Hero Section */}
        <section className="hero text-center p-5" style={{ backgroundImage: `url(${content.hero.image})`, backgroundSize: 'cover' }}>
          <h1 className="text-white">{content.hero.text}</h1>
        </section>

        {/* About Section */}
        <section className="about my-5 text-center">
          <h2>{content.about.text}</h2>
          <p>{content.about.description}</p>
        </section>

        {/* Services Section */}
        <section className="services my-5 text-center">
          <h2>Our Services</h2>
          <div className="row mt-4">
            {content.services.map((service, index) => (
              <div className="col-md-4" key={index}>
                <img src={service.image} alt={service.title} className="img-fluid mb-3" />
                <h5>{service.title}</h5>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
