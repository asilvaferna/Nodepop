'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const createJWT = require('../../lib/utils');

router.post('/authenticate/login', async (req, res, next) => {
	try {
		// get credentials
		const email = req.body.email;
		const key = req.body.key;

		// validate user
		if (!email) {
			res.json({ success: true, message: 'Invalid credentials.' });
			return;
		}

		// validate password
		if (!key) {
			res.json({ success: true, message: 'Invalid credentials.' });
		}

		// search for the user in the DB
		const user = await User.findOne({ email: email }).exec();

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

	const user = new User();
	user.name = name;
	user.email = email;
	user.key = user.setPassword(key);

	await user.save((error, insertedUser) => {
		if (error) {
			next(error);
			return;
		}

		createJWT(insertedUser, next, res);
	});

});

module.exports = router;