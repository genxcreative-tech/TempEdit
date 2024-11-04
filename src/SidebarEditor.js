import React, { useState } from 'react';

const SidebarEditor = ({ initialContent, onSave }) => {
  const [content, setContent] = useState(initialContent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setContent({ ...content, headerImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(content);
  };

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.heading}>Edit Content</h2>

      <label style={styles.label}>
        Header Text:
        <input type="text" name="headerText" value={content.headerText} onChange={handleChange} style={styles.input} />
      </label>

      <label style={styles.label}>
        Body Text:
        <textarea name="bodyText" value={content.bodyText} onChange={handleChange} style={styles.textarea} />
      </label>

      <label style={styles.label}>
        Header Image:
        <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
      </label>

      <label style={styles.label}>
        Background Color:
        <input type="color" name="backgroundColor" value={content.backgroundColor} onChange={handleChange} style={styles.colorInput} />
      </label>

      <button onClick={handleSave} style={styles.saveButton}>Save</button>
    </aside>
  );
};

export default SidebarEditor;

const styles = {
  sidebar: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f7f9fc',
    borderLeft: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
  },
  heading: {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '10px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.9em',
    color: '#555',
  },
  input: {
    padding: '8px',
    fontSize: '1em',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  textarea: {
    padding: '8px',
    fontSize: '1em',
    marginTop: '5px',
    height: '80px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    resize: 'vertical',
  },
  fileInput: {
    marginTop: '5px',
  },
  colorInput: {
    width: '50px',
    height: '30px',
    marginTop: '5px',
    border: 'none',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s',
  },
};