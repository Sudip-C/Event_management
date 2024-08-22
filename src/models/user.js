// src/models/user.js
require('reflect-metadata');
const { Entity, ObjectIdColumn, Column } = require('typeorm');

@Entity()
class User {
    @ObjectIdColumn()
    _id = undefined;

    @Column({type:"varchar"})
    email = '';

    @Column({type:"varchar"})
    password = ''; // Make sure to hash passwords

    @Column({type:"varchar"})
    name = '';

    @Column({type: 'array', default: [] })
    borrowedBooks = []; // Array of borrowed book IDs
}

module.exports = User;
