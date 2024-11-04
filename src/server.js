const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Load content from JSON file
app.get('/api/content', (req, res) => {
  fs.readFile('./content.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read content' });
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