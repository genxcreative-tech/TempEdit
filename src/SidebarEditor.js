/* src/SidebarEditor.js */

import React, { useState } from 'react';

const SidebarEditor = ({ field, content, onSave, onClose }) => {
  const [editableContent, setEditableContent] = useState(content[field]);

  // Handle change for text or color inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableContent({ ...editableContent, [name]: value });
  };

  // Handle change for sliders (only for image width/height adjustments)
  const handleSliderChange = (name, value) => {
    setEditableContent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setEditableContent({ ...editableContent, src: upload.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updated content
  const handleSave = () => {
    onSave({ [field]: editableContent });
    onClose();
  };

  return (
    <aside style={{ width: '300px', padding: '20px', backgroundColor: '#f4f4f4', borderLeft: '1px solid #ddd' }}>
      <button onClick={onClose} style={{ float: 'right', fontSize: '1.2em' }}>✖️</button>
      <h2>Edit {field === 'headerText' || field === 'bodyText' ? 'Text' : 'Image'}</h2>

      {field === 'headerText' || field === 'bodyText' ? (
        <div>
          <label>
            Text:
            <textarea
              name={field}
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              style={{ width: '100%', minHeight: '80px' }}
            />
          </label>
        </div>
      ) : field === 'headerImage' ? (
        <div>
          <label>
            Image URL:
            <input
              type="text"
              name="src"
              value={editableContent.src}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </label>
          <label>
            Select Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ width: '100%' }}
            />
          </label>
          <label>
            Width (%):
            <input
              type="range"
              name="width"
              min="10"
              max="100"
              value={editableContent.width}
              onChange={(e) => handleSliderChange('width', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
          <label>
            Height (%):
            <input
              type="range"
              name="height"
              min="10"
              max="100"
              value={editableContent.height}
              onChange={(e) => handleSliderChange('height', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img src={editableContent.src} alt="Preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      ) : null}

      <button onClick={handleSave} style={{ marginTop: '20px', width: '100%' }}>Save</button>
    </aside>
  );
};

export default SidebarEditor;
