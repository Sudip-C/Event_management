// src/routes/authorRoutes.js
const { Router } = require('express');
const authorController = require('../controllers/authorController');

const router = Router();

router.use('/authors', authorController);

module.exports = router;
