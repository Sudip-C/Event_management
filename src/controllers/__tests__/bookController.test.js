// src/controllers/__tests__/bookController.test.js
const request = require('supertest');
const express = require('express');
const dataSource = require('../../config/data-source');
const bookRoutes = require('../../routes/bookRoutes');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

describe('BookController', () => {
    beforeAll(async () => {
        await dataSource.initialize();
    });

    test('should borrow a book', async () => {
        const response = await request(app)
            .post('/books/borrow')
            .send({ userId: 'user1', bookId: 'book1', dueDate: new Date().toISOString() });

        expect(response.status).toBe(200);
        expect(response.body.isBorrowed).toBe(true);
    });

    test('should return a book', async () => {
        const response = await request(app)
            .post('/books/return')
            .send({ userId: 'user1', bookId: 'book1' });

        expect(response.status).toBe(200);
        expect(response.body.isBorrowed).toBe(false);
    });
});
