// src/services/bookService.js
const { ObjectId } = require('mongodb');

class BookService {
    constructor(bookRepository, userRepository, auditLogRepository,auditLogService) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.auditLogService = auditLogService;
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

        if (!user.borrowedBooks.includes(BookObjectId)) {
            throw new Error('Book was not borrowed by this user');
        }

        book.isBorrowed = false;
        book.dueDate = null;
        user.borrowedBooks = user.borrowedBooks.filter(id => id !== BookObjectId);

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
           res.status(200).json({message:'Audit log entry created successfully.'});
        } catch (error) {
            res.status(400).json({error: error});
        }

        return book;
    }
}

module.exports = BookService;
