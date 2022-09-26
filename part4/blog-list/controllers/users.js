const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	if (!username || !password) {
		response.status(400).json({ error: 'missing username or password' });
	}

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return response.status(400).json({
			error: 'username must be unique',
		});
	}

	if (username.length < 3 || password.length < 3) {
		return response.status(400).json({
			error: 'username or password must be at least 3 characters long',
		});
	}

	const saltRound = 10;
	const passwordHash = await bcrypt.hash(password, saltRound);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();
	response.status(201).json(savedUser);
});

module.exports = usersRouter;
