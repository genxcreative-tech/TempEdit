import React, { useState, useEffect } from 'react';
import SidebarEditor from './SidebarEditor';
import axios from 'axios';

const App = () => {
  const [editableContent, setEditableContent] = useState({
    headerText: 'Welcome to Our Website',
    bodyText: 'Here is some introductory text for the website.',
    headerImage: '/path/to/initial-image.jpg',
    backgroundColor: '#ffffff',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(response => setEditableContent(response.data))
      .catch(error => console.error('Failed to fetch content', error));
  }, []);

  const handleSaveContent = (updatedContent) => {
    setEditableContent(updatedContent);
    axios.post('http://localhost:5000/api/content', updatedContent)
      .then(response => console.log(response.data.message))
      .catch(error => console.error('Failed to save content', error));
  };

  return (
    <div style={{ display: 'flex' }}>
      <main style={{ flex: 1, padding: '20px', backgroundColor: editableContent.backgroundColor }}>
        <h1>{editableContent.headerText}</h1>
        <img src={editableContent.headerImage} alt="Header" style={{ width: '100%', borderRadius: '10px' }} />
        <p>{editableContent.bodyText}</p>
      </main>
      <SidebarEditor initialContent={editableContent} onSave={handleSaveContent} />
    </div>
  );
};

export default App;