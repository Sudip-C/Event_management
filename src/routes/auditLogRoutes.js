// src/routes/auditLogRoutes.js
const { Router } = require('express');
const auditLogController = require('../controllers/auditLogController');

const router = Router();

router.use('/audit-logs', auditLogController);

module.exports = router;
