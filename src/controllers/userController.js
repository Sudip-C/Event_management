// src/controllers/userController.js
const { Router } = require('express');
const UserService = require('../services/userService');
const UserRepository = require('../repositories/userRepository');
const dataSource = require('../config/data-source');
const { ObjectId } = require('mongodb');

const router = Router();
const userRepository = new UserRepository(dataSource);
const userService = new UserService(userRepository);

// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = await userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); 
        const user = await userService.updateUser(userId, req.body);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); 
        const result = await userService.deleteUser(userId); 
        if (result.affected > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
