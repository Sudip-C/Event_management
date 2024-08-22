// src/models/book.js
require('reflect-metadata');
const { Entity, ObjectIdColumn, Column } = require('typeorm');

@Entity()
class Book {
    @ObjectIdColumn()
    _id = undefined;

    @Column({ type: 'varchar' })
    title = '';

    @Column({ type: 'varchar' })
    author = '';

    @Column({ type: 'varchar' })
    genre = '';

    @Column({ type: 'boolean' })
    isBorrowed = false;

    @Column({ type: 'date' })
    publishedDate = new Date();
}

module.exports = Book;
