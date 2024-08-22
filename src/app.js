// src/app.js
require('reflect-metadata'); 
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dataSource = require('./config/data-source');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const userRoutes = require('./routes/userRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
dataSource.initialize()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define routes
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/users', userRoutes);
app.use('/audit-logs', auditLogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
