// src/repositories/auditLogRepository.js
const { Repository } = require('typeorm');
const AuditLog = require('../models/auditLog');

class AuditLogRepository extends Repository {
    constructor(dataSource) {
        super(AuditLog, dataSource.createEntityManager());
    }

    // Add custom methods if needed
}

module.exports = AuditLogRepository;
