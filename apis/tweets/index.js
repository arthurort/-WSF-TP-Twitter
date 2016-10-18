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

	server.route({
		method: 'GET',
		path: '/tweets',
		handler: (request, reply) => {
		models.tweet.findAll()
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error: err.message
				})
			})
		}
	})

	server.route({
		method: 'GET',
		path: '/tweets/{id}',
		handler: (request, reply) => {
		const data = request.payload || request.params || request.body;
		models.tweet.findById(data.id)
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error: err.message
				})
			})
		}
	})

	server.route({
		method: 'GET',
		path:'/users/{id}/tweets',
		handler: (request, reply) => {
		const data = request.payload || request.params || request.body; 
		models.tweet.findAll({
			where: {
				user_id: data.id
			}
		})
			.then(result => {
					return reply(result)
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})
		}
	})

	server.route({
		method: 'PUT',
		path: '/tweets/{id}',
		handler: (request, reply) => {
		models.tweet.update(request.payload, {
			where: {
				id: request.params.id
			}
		})
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error: err.message
				})
			})
		}
	})

	server.route({
    	method: 'DELETE',
		path:'/tweets/{id}',
		handler:  (request, reply) => {
		models.tweet.destroy({
			where: {
				id: request.params.id
			}
		})
			.then(result => {
				return reply('Deleted successfully !')
			})
			.catch(err => {
				return reply({
					error:err.message
				})
			})
		}
	})
	next();
};


exports.register.attributes = {
	name: 'tweets'
};
