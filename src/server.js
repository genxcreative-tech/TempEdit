const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Load content from JSON file or initialize if empty
app.get('/api/content', (req, res) => {
  fs.readFile('./content.json', 'utf8', (err, data) => {
    if (err || !data) {
      // Initialize with default content if file is missing or empty
      const initialContent = {
        navbarTitle: 'Your Brand',
        heroTitle: 'Welcome to Our Website',
        heroSubtitle: 'This is a description for your hero section.',
        heroImage: '/path/to/initial-image.jpg',
        servicesTitle: 'Our Services',
        service1Title: 'Service 1',
        service1Description: 'Description for Service 1.',
        service2Title: 'Service 2',
        service2Description: 'Description for Service 2.',
        contactTitle: 'Contact Us',
      };
      fs.writeFileSync('./content.json', JSON.stringify(initialContent, null, 2));
      return res.json(initialContent);
    }
    res.json(JSON.parse(data));
  });
});

// Save updated content to JSON file
app.post('/api/content', (req, res) => {
  const updatedContent = req.body;
  fs.writeFile('./content.json', JSON.stringify(updatedContent, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save content' });
    }
    res.json({ message: 'Content updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
