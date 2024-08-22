// src/routes/userRoutes.js
const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.use('/users', userController);

module.exports = router;
