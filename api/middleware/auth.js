const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json({
			message: 'No token, authorization denied',
			status: 401,
		});
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded;
		// console.log('DECODED TOKEN', decoded);
		next();
	} catch (e) {
		res.status(400).json({ message: 'Token is not valid', status: 400 });
	}
}

module.exports = auth;
