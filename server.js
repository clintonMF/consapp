
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  
// Get all users
app.get('/users', (req, res) => {
res.json(users);
});
// POST endpoint to accept and save content
app.post('/save-content', (req, res) => {
    const { content } = req.body;
  
    // Validate input
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
  
    // Define the fixed filename
    const filePath = path.join(__dirname, 'storage.md');
  
    // Append content to the markdown file
    fs.appendFile(filePath, `${content}\n`, (err) => {
      if (err) {
        console.error('Error appending to file:', err);
        return res.status(500).json({ message: 'Failed to save content' });
      }
  
      res.status(201).json({ message: 'Content appended successfully', filePath });
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
