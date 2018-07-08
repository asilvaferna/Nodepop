'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');

router.post('/authenticate/login', async (req, res, next) => {
	try {
		// get credentials
		const email = req.body.email;
		const key = req.body.key;

		// search for the user in the DB
		const user = await User.findOne({ email: email }).exec();

		// validate user
		if (!user) {
			res.json({ success: true, message: 'Invalid credentials.' });
			return;
		}

		// validate password
		if (key !== user.key) {
			res.json({ success: true, message: 'Invalid credentials.' });
		}

		// create JWT
		createJWT(user, next, res);
	} catch (error) {
		next(error);
	}
});

router.post('/authenticate/signup', async (req, res, next) => {

	const name = req.body.name;
	const email = req.body.email;
	const key = req.body.key;

	if (!name) {
		res.json({ success: true, message: 'Invalid credentials.' });
		return;
	}

	if (!email) {
		res.json({ success: true, message: 'Invalid credentials.' });
		return;
	}

	if (!key) {
		res.json({ success: true, message: 'Invalid credentials.' });
		return;
	}

	const user = await new User({
		name: name,
		email: email,
		key: key
	});

	const insertedUser = await user.save();

	createJWT(insertedUser, next, res);
});

// creates a JWT for a given user
function createJWT(user, next, res) {
	jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
		expiresIn: localConfig.jwt.expiresIn
	}, (err, token) => {
		if (err) {
			next(err);
			return;
		}
		// respond to client with JWT
		res.json({ success: true, token: token });
	});
}

module.exports = router;