// src/models/auditLog.js
require('reflect-metadata');
const { Entity, ObjectIdColumn, Column } = require('typeorm');

@Entity()
class AuditLog {
    @ObjectIdColumn()
    _id = undefined;

    @Column({ type: 'varchar' })
    userId = '';

    @Column({ type: 'varchar' })
    action = ''; // e.g., 'borrow', 'return'

    @Column({ type: 'varchar' })
    details = '';

    @Column({ type: 'date' })
    timestamp = new Date();
}

module.exports = AuditLog;
