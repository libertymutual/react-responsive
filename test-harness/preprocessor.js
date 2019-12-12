const babelJest = require('babel-jest');
const bableConfig = require('../babel.config');

module.exports = babelJest.createTransformer(bableConfig);
