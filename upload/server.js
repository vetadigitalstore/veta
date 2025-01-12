const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Static ফাইল সার্ভ করার জন্য
app.use(express.static(__dirname)); // index.html, style.css, script.js সার্ভ করবে

// API: ফাইল এবং ফোল্ডার লিস্ট করার জন্য
app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads'); // 'uploads' ফোল্ডারকে লক্ষ্য করে

  fs.readdir(directoryPath, { withFileTypes: true }, (err, items) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error reading directory.' });
    }

    const files = items.map(item => ({
      name: item.name,
      isDirectory: item.isDirectory(),
    }));

    res.json({ success: true, files });
  });
});

// সার্ভার চালু করুন
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});