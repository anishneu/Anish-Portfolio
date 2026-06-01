const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require("path");
const emailRoutes = require(path.join(__dirname,'routes','emailRoutes'));

const cors = require('cors');
const { loadSecretsFromFiles } = require('./loadSecrets');

dotenv.config();
const secretsLoaded = loadSecretsFromFiles();
if (secretsLoaded > 0) {
  console.log(`Loaded ${secretsLoaded} credential(s) from secret file mount`);
}

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/email', emailRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
