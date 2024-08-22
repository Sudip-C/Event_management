// src/models/author.js
require('reflect-metadata');
const { Entity, ObjectIdColumn, Column } = require('typeorm');

@Entity()
class Author {
    @ObjectIdColumn()
    _id = undefined;

    @Column({ type: 'varchar' })
    name = '';

    @Column({ type: 'varchar' })
    biography = '';

    @Column({ type: 'date' })
    dateOfBirth = new Date();

    @Column({ type: 'varchar' })
    nationality = '';
}

module.exports = Author;
