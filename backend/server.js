// backend/server.js
require('dotenv').config();  // Add this line
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const petitionRoutes = require('./routes/petitions');
const pollRoutes = require('./routes/polls');
const db = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/petitions', petitionRoutes);
app.use('/api/polls', pollRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
