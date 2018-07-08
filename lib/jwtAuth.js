'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// middleware that validates JWT
module.exports = function() {
	return (req, res, next) => {
		// get petition's token
		const token = req.body.token || req.query.token || req.get('x-access-token');

		// if token doesn't exists -> 'non authorized'
		if (!token) {
			const err = new Error('No token provided');
			err.status = 401;
			next(err);
			return;
		}

		// if token exists -> verify token
		jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
			if (err) {
				err.status = 401;
				next(err);
				return;
			}
            
			req.user_id = decoded.user_id;
			next();
		});

	};
};