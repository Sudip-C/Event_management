// src/services/userService.js

const { ObjectId } = require('mongodb');


class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userData) {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async getUserById(id) {
        const objectId = new ObjectId(id);
        return await this.userRepository.findOneBy(objectId);
    }

    async updateUser(id, userData) {
        const objectId = new ObjectId(id);
        await this.userRepository.update(objectId, userData);
        return this.getUserById(objectId);
    }

    async deleteUser(id) {
        const objectId = new ObjectId(id);
        return await this.userRepository.delete(objectId);
    }

    async getUserBorrowedBooks(userId) {
        const objectId = new ObjectId(userId);
        const user = await this.userRepository.findOneBy( objectId );
        if (!user) {
            throw new Error('User not found');
        }
        return user.borrowedBooks;
    }
}

module.exports = UserService;
