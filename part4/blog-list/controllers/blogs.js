const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	const body = request.body;

	const user = request.user;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog) {
		res.json(blog);
	} else {
		res.status(404).end();
	}
});

blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	const user = request.user;

	if (blog.user.toString() === user._id.toString()) {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} else {
		response.status(401).json({ error: 'Not authorized' });
	}
});

blogsRouter.put('/:id', async (request, response) => {
	const { likes } = request.body;

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{ likes },
		{ new: true, runValidators: true, context: 'query' }
	);

	response.json(updatedBlog);
});

module.exports = blogsRouter;
