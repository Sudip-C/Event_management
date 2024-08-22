// src/repositories/bookRepository.js
const { Repository } = require('typeorm');
const Book = require('../models/book');

class BookRepository extends Repository {
    constructor(dataSource) {
        super(Book, dataSource.createEntityManager());
    }

    // Add custom methods if needed
}

module.exports = BookRepository;
