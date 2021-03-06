const userService = require('../../services/authService');

const signup = async (req, res, next) => {
	const body = req.body;
	console.log('BODY');
	console.log(req.body);
	try {
		const token = await userService.createUser(body);
		res.json({ token });
	} catch (error) {
		return next(error);
	}
};

const login = async (req, res, next) => {
	const user = req.body;
	try {
		const token = await userService.login(user);
		res.json({ token });
	} catch (error) {
		res.status(422);
		next(error);
	}
};

module.exports = {
	signup,
	login
};
