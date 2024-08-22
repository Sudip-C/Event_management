// src/repositories/userRepository.js
const { Repository } = require('typeorm');
const User = require('../models/user');

class UserRepository extends Repository {
    constructor(dataSource) {
        super(User, dataSource.createEntityManager());
    }

    // Add custom methods if needed
}

module.exports = UserRepository;
