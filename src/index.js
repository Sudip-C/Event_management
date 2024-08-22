// src/index.js
require('reflect-metadata');
require('@babel/register')({
    ignore: [/(node_module)/],
    extensions: ['.js']
});

require('./app');
