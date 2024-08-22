// src/controllers/auditLogController.js
const { Router } = require('express');
const AuditLogService = require('../services/auditLogService');
const AuditLogRepository = require('../repositories/auditLogRepository');
const dataSource = require('../config/data-source');
const { ObjectId } = require('mongodb')

const router = Router();
const auditLogRepository = new AuditLogRepository(dataSource);
const auditLogService = new AuditLogService(auditLogRepository);

// Get all audit logs
router.get('/', async (req, res) => {
    try {
        const logs = await auditLogService.getAllLogs();
        res.json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get audit logs by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const logs = await auditLogService.getLogsByUser(req.params.userId);
        res.json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get audit logs by action
router.get('/action/:action', async (req, res) => {
    try {
        const logs = await auditLogService.getLogsByAction(new ObjectId(req.params.action));
        res.json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get audit logs by date range
router.get('/date-range', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const logs = await auditLogService.getLogsByDateRange(startDate, endDate);
        res.json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
