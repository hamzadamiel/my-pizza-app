const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve the static build of your React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve your JSON data files
app.use('/data', express.static(path.join(__dirname, 'data')));

// Handle requests to your React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});