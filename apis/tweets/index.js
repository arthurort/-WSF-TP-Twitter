/**
 * Module dependencies.
 */

const models = require('../../database');

/**
 * Export the tweet API with its own routes.
 */

exports.register = function (server, options, next) {
	server.route({
		method:'POST',
		path:'/tweets',
		handler:(request, reply) => {
		const data = request.payload || request.params || request.body;
		models.tweet.create(data)
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error : err.message
				})
			})
		}
	})
	next();
};


exports.register.attributes = {
	name: 'tweets'
};
