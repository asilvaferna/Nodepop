const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

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

module.exports = createJWT;