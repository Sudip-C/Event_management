// src/services/authorService.js
const { ObjectId } = require('mongodb');

class AuthorService {
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }

    async createAuthor(authorData) {
        const author = this.authorRepository.create(authorData);
        return await this.authorRepository.save(author);
    }

    async getAllAuthors() {
        return await this.authorRepository.find();
    }

    async getAuthorById(id) {
        const objectId = new ObjectId(id);
        return await this.authorRepository.findOneBy(objectId);
    }

    async updateAuthor(id, authorData) {
        const objectId = new ObjectId(id);
        await this.authorRepository.update(objectId, authorData);
        return this.getAuthorById(id);
    }

    async deleteAuthor(id) {
        const objectId = new ObjectId(id);
        return await this.authorRepository.delete(objectId);
    }
}

module.exports = AuthorService;
