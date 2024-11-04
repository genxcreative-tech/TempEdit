import React from 'react';
import { useLocation } from 'react-router-dom';

const PreviewPage = () => {
  const { state } = useLocation();
  const { content } = state || {};

  return (
    <div className="main-content p-4">
      {/* Hero Section */}
      {content ? (
        <>
          <section
            className="hero text-center p-5"
            style={{ backgroundImage: `url(${content.hero.image})`, backgroundSize: 'cover' }}
          >
            <h1 className="text-white">{content.hero.text}</h1>
          </section>

          {/* Dynamic Sections */}
          {content.dynamicSections.map((section, index) => (
            <div key={index} className="my-4">
              {section.type === 'text' && (
                <div>
                  <h5>Text Section</h5>
                  <p>{section.content}</p>
                </div>
              )}
              {section.type === 'image' && section.url && (
                <div>
                  <h5>Image Section</h5>
                  <img src={section.url} alt="Dynamic" className="img-fluid mt-2" />
                </div>
              )}
              {section.type === 'video' && section.url && (
                <div>
                  <h5>Video Section</h5>
                  <div className="embed-responsive embed-responsive-16by9 mt-2">
                    <iframe
                      className="embed-responsive-item"
                      src={section.url}
                      allowFullScreen
                      title="Dynamic Video"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>No content to preview</p>
      )}
    </div>
  );
};

export default PreviewPage;
