// src/services/auditLogService.js
const { ObjectId } = require('mongodb');

class AuditLogService {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    async createAuditLog(logData) {
        const log = this.auditLogRepository.create(logData);
        return await this.auditLogRepository.save(log);
    }

    async getAllLogs() {
        return await this.auditLogRepository.find();
    }

    async getLogsByUser(userId) {
        const objectId = new ObjectId(userId);
        return await this.auditLogRepository.find({ where: { objectId } });
    }

    async getLogsByAction(action) {
        return await this.auditLogRepository.find({ where: { action } });
    }

    async getLogsByDateRange(startDate, endDate) {
        return await this.auditLogRepository.find({
            where: {
                timestamp: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        });
    }
}

module.exports = AuditLogService;
