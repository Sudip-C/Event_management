// src/controllers/authorController.js
const { Router } = require('express');
const AuthorService = require('../services/authorService');
const AuthorRepository = require('../repositories/authorRepository');
const dataSource = require('../config/data-source');
const { ObjectId } = require('mongodb');

const router = Router();
const authorRepository = new AuthorRepository(dataSource);
const authorService = new AuthorService(authorRepository);

// Create a new author
router.post('/', async (req, res) => {
    try {
        const author = await authorService.createAuthor(req.body);
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await authorService.getAllAuthors();
        res.json(authors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get an author by ID
router.get('/:id', async (req, res) => {
    try {
        const authorId = new ObjectId(req.params.id); 
        const author = await authorService.getAuthorById(authorId);
        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ error: 'Author not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an author
router.put('/:id', async (req, res) => {
    try {
        const authorId = new ObjectId(req.params.id); 
        const author = await authorService.updateAuthor(authorId, req.body);
        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ error: 'Author not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an author
router.delete('/:id', async (req, res) => {
    try {
        const authorId = new ObjectId(req.params.id); 
        const result = await authorService.deleteAuthor(authorId);
        if (result.affected > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Author not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
