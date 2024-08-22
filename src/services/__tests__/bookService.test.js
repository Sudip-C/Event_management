// src/services/__tests__/bookService.test.js
const BookService = require('../bookService');
const BookRepository = require('../../repositories/bookRepository');
const UserRepository = require('../../repositories/userRepository');
const AuditLogRepository = require('../../repositories/auditLogRepository');
const { mock } = require('jest-mock');

describe('BookService', () => {
    let bookService;
    let bookRepository;
    let userRepository;
    let auditLogRepository;

    beforeEach(() => {
        bookRepository = new BookRepository();
        userRepository = new UserRepository();
        auditLogRepository = new AuditLogRepository();
        bookService = new BookService(bookRepository, userRepository, auditLogRepository);
    });

    test('should borrow a book successfully', async () => {
        // Mock data
        const userId = 'user1';
        const bookId = 'book1';
        const dueDate = new Date();

        // Mock methods
        mock(bookRepository.findOneBy).mockResolvedValue({ id: bookId, isBorrowed: false });
        mock(userRepository.findOneBy).mockResolvedValue({ id: userId, borrowedBooks: [] });
        mock(bookRepository.save).mockResolvedValue();
        mock(userRepository.save).mockResolvedValue();
        mock(auditLogRepository.create).mockResolvedValue();

        // Call method
        const book = await bookService.borrowBook(userId, bookId, dueDate);

        expect(book.isBorrowed).toBe(true);
        expect(book.dueDate).toBe(dueDate);
    });

    test('should return a book successfully', async () => {
        // Mock data
        const userId = 'user1';
        const bookId = 'book1';

        // Mock methods
        mock(bookRepository.findOneBy).mockResolvedValue({ id: bookId, isBorrowed: true });
        mock(userRepository.findOneBy).mockResolvedValue({ id: userId, borrowedBooks: [bookId] });
        mock(bookRepository.save).mockResolvedValue();
        mock(userRepository.save).mockResolvedValue();
        mock(auditLogRepository.create).mockResolvedValue();

        // Call method
        const book = await bookService.returnBook(userId, bookId);

        expect(book.isBorrowed).toBe(false);
        expect(book.dueDate).toBeNull();
    });
});
