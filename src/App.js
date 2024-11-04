/* src/App.js */

import React, { useState, useEffect } from 'react';
import SidebarEditor from './SidebarEditor';
import axios from 'axios';

const App = () => {
  const [editableContent, setEditableContent] = useState({
    headerText: 'Welcome to Our Website',
    bodyText: 'Here is some introductory text for the website.',
    headerImage: {
      src: '/path/to/initial-image.jpg',
      width: 100,
      height: 100,
    },
    backgroundColor: '#ffffff',
  });

  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(response => setEditableContent(response.data))
      .catch(error => console.error('Failed to fetch content', error));
  }, []);

  const handleSaveContent = (updatedField) => {
    const updatedContent = { ...editableContent, ...updatedField };
    setEditableContent(updatedContent);
    axios.post('http://localhost:5000/api/content', updatedContent)
      .then(response => console.log(response.data.message))
      .catch(error => console.error('Failed to save content', error));
  };

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <main style={{ flex: 1, padding: '20px', backgroundColor: editableContent.backgroundColor }}>
        <EditableText
          text={editableContent.headerText}
          onEdit={() => setSelectedElement('headerText')}
        />
        <EditableImage
          src={editableContent.headerImage.src}
          width={editableContent.headerImage.width}
          height={editableContent.headerImage.height}
          onEdit={() => setSelectedElement('headerImage')}
        />
        <EditableText
          text={editableContent.bodyText}
          onEdit={() => setSelectedElement('bodyText')}
        />
      </main>
      {selectedElement && (
        <SidebarEditor
          field={selectedElement}
          content={editableContent}
          onSave={handleSaveContent}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
};

const styles = {
  editableContainer: {
    position: 'relative',
    marginBottom: '20px',
    padding: '10px',
    border: '1px dashed #ccc',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  },
  editIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    fontSize: '1.2em',
    cursor: 'pointer',
    color: '#007bff',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
};

const EditableText = ({ text, onEdit }) => (
  <div
    style={styles.editableContainer}
    onMouseEnter={(e) => (e.currentTarget.querySelector('span').style.opacity = 1)}
    onMouseLeave={(e) => (e.currentTarget.querySelector('span').style.opacity = 0)}
  >
    <p>{text}</p>
    <span style={styles.editIcon} onClick={onEdit}>✏️</span>
  </div>
);

const EditableImage = ({ src, width, height, onEdit }) => (
  <div
    style={styles.editableContainer}
    onMouseEnter={(e) => (e.currentTarget.querySelector('span').style.opacity = 1)}
    onMouseLeave={(e) => (e.currentTarget.querySelector('span').style.opacity = 0)}
  >
    <img src={src} alt="Editable Header" style={{ width: `${width}%`, height: `${height}%`, borderRadius: '10px' }} />
    <span style={styles.editIcon} onClick={onEdit}>🖼️</span>
  </div>
);

export default App;
