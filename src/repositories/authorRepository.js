// src/repositories/authorRepository.js
const { Repository } = require('typeorm');
const Author = require('../models/author');

class AuthorRepository extends Repository {
    constructor(dataSource) {
        super(Author, dataSource.createEntityManager());
    }

    // Add custom methods if needed
}

module.exports = AuthorRepository;
