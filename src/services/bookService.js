// src/services/bookService.js
const { ObjectId } = require('mongodb');
const AuditLogService = require('./auditLogService');

class BookService {
    constructor(bookRepository, userRepository, auditLogRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.auditLogService = new AuditLogService(auditLogRepository); 
    }

    async createBook(bookData) {
        const book = this.bookRepository.create(bookData);
        return await this.bookRepository.save(book);
    }

    async getAllBooks() {
        return await this.bookRepository.find();
    }

    async getBookById(id) {
        const objectId = new ObjectId(id);
        return await this.bookRepository.findOneBy(objectId);
    }

    async updateBook(id, bookData) {
        const objectId = new ObjectId(id);
        await this.bookRepository.update(objectId, bookData);
        return this.getBookById(objectId);
    }

    async deleteBook(id) {
        const objectId = new ObjectId(id);
        return await this.bookRepository.delete(objectId);
    }

    async borrowBook(userId, bookId, dueDate) {
        const UserObjectId = new ObjectId(userId);
        const BookObjectId = new ObjectId(bookId);
        const book = await this.bookRepository.findOneBy({ _id: BookObjectId });
        const user = await this.userRepository.findOneBy({ _id: UserObjectId });

        if (!user) {
            throw new Error('User not found');
        }

        // Check if the book exists
        if (!book) {
            throw new Error('Book not found');
        }

        if (book.isBorrowed) {
            throw new Error('Book is already borrowed');
        }

        if (user.borrowedBooks.length >= 5) {  // Example constraint: max 5 borrowed books
            throw new Error('User has reached the maximum borrow limit');
        }

        book.isBorrowed = true;
        book.dueDate = dueDate;
        user.borrowedBooks.push(bookId);

        await this.bookRepository.save(book);
        await this.userRepository.save(user);

        // Log the borrowing action
        try {
            await this.auditLogService.createAuditLog({
                UserObjectId,
                action: 'Borrow',
                details: `User ${UserObjectId} borrowed book ${BookObjectId}`,
                timestamp: new Date(),
            });
           console.log('Audit log entry created successfully.');
        } catch (error) {
            throw new Error(error);
        }

        return book;
    }

    async returnBook(userId, bookId) {
        const UserObjectId = new ObjectId(userId);
        const BookObjectId = new ObjectId(bookId);
        const book = await this.bookRepository.findOneBy({ _id: BookObjectId });
        const user = await this.userRepository.findOneBy({ _id: UserObjectId });

        if (!book || !user) {
            throw new Error('Book or User not found');
        }

        if (!book.isBorrowed) {
            throw new Error('Book is not currently borrowed');
        }

        const bookIndex = user.borrowedBooks.findIndex(borrowedBookId => borrowedBookId.equals(BookObjectId));

    if (bookIndex === -1) {
        throw new Error('Book is not borrowed by this user');
    }

    // Remove the book from the user's borrowedBooks list
    user.borrowedBooks.splice(bookIndex, 1);

    // Mark the book as not borrowed
    book.isBorrowed = false;
    book.dueDate = null;

        await this.bookRepository.save(book);
        await this.userRepository.save(user);

        // Log the returning action
        try {
            await this.auditLogService.createAuditLog({
                UserObjectId,
                action: 'Return',
                details: `User ${UserObjectId} borrowed book ${BookObjectId}`,
                timestamp: new Date(),
            });
            console.log('Audit log entry created successfully.');
        } catch (error) {
            console.error('Failed to create audit log:', error);
        }

        return book;
    }
}

module.exports = BookService;
