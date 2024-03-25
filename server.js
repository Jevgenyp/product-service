const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'static' folder
app.use(express.static('static'));

// Additionally, if you want to serve images from a separate folder,
// you can set up another static serve for the 'images' directory.
// This way, you can access images via '/images/header.jpg'
app.use('/images', express.static(path.join(__dirname, 'images')));


const PORT = process.env.PORT || 8080;  // Use the PORT environment variable or default to 8082
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
