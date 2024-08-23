// src/controllers/bookController.js
const { Router } = require('express');
const BookService = require('../services/bookService');
const BookRepository = require('../repositories/bookRepository');
const UserRepository = require('../repositories/userRepository');
const AuditLogRepository = require('../repositories/auditLogRepository');
const AuditLogService = require('../services/auditLogService'); 
const dataSource = require('../config/data-source');
const { ObjectId } = require('mongodb'); 

const router = Router();
const bookRepository = new BookRepository(dataSource);
const userRepository = new UserRepository(dataSource);
const auditLogRepository = new AuditLogRepository(dataSource);
const auditLogService = new AuditLogService(auditLogRepository);
const bookService = new BookService(bookRepository, userRepository, auditLogRepository);

// Create a new book
router.post('/', async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id); 
        const book = await bookService.getBookById(bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id); 
        const book = await bookService.updateBook(bookId, req.body);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id); 
        const result = await bookService.deleteBook(bookId);
        if (result.affected > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/borrow', async (req, res) => {
    try {
        const { userId, bookId, dueDate } = req.body;
        const book = await bookService.borrowBook(new ObjectId(userId), new ObjectId(bookId), new Date(dueDate));
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/return', async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const book = await bookService.returnBook(new ObjectId(userId), new ObjectId(bookId));
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
