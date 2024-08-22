// src/di/diContainer.js
const { Container } = require('tsyringe');
const dataSource = require('../config/data-source');

// Register the DataSource instance
Container.registerInstance('dataSource', dataSource);

module.exports = Container;
