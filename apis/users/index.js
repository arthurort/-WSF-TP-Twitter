/**
 * Module dependencies.
 */

const models = require('../../database');

/**
 * Export the user API with its own routes.
 */

exports.register = function (server, options, next) {

  next();
};

exports.register.attributes = {
  name: 'users'
};
