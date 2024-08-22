// src/config/data-source.js
require('reflect-metadata'); 
const { DataSource } = require('typeorm');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');
const AuditLog = require('../models/auditLog');
require('dotenv').config();

const dataSource = new DataSource({
    type: 'mongodb',
    url: process.env.MONGO_URL,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [Book, Author, User, AuditLog],
    synchronize: true,
});

module.exports = dataSource;
