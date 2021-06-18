const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { api_secret } = require('../config');

const createUser = async user => {
	try {
		let newUser = new User(user);
		newUser = await newUser.save();
		return await getToken(newUser);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const login = async user => {
	try {
		const userFromDb = await User.findOne({ username: user.username });
		if (!userFromDb) {
			throw new Error('User do not exist');
		}
		const correctPassword = await userFromDb.comparePassword(user.password);
		if (!correctPassword) {
			throw new Error('Incorrect password');
		}
		return getToken(userFromDb);
	} catch (error) {
		throw error;
	}
};

const getToken = async user => {
	const token = await jwt.sign(
		{
			id: user.id,
			username: user.username
		},
		api_secret
	);
	return token;
};

module.exports = {
	createUser,
	login
};
