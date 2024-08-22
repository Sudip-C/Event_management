// src/routes/bookRoutes.js
const { Router } = require('express');
const bookController = require('../controllers/bookController');

const router = Router();

router.use('/books', bookController);

module.exports = router;
