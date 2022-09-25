const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
}, 100000);

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 100000);

test('the unique identifier of the blog posts is id', async () => {
	const blogs = await helper.blogsInDb();

	expect(blogs[0].id).toBeDefined();
}, 100000);

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'Lecture 42 - React Custom Hooks',
		author: 'Aditya Chakraborty',
		url: 'https://stacklearner.com/lecture-42-react-custom-hooks',
		likes: 30,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

	newBlog.id = blogsAtEnd[blogsAtEnd.length - 1].id;

	expect(blogsAtEnd).toContainEqual(newBlog);
});

test('blog without likes is added as 0', async () => {
	const newBlog = {
		title: 'Lecture 42 - React Custom Hooks',
		author: 'Aditya Chakraborty',
		url: 'https://stacklearner.com/lecture-42-react-custom-hooks',
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
});

test('blog without title and url cannot be added', async () => {
	const newBlog = {
		author: 'Aditya Chakraborty',
	};

	await api.post('/api/blogs').send(newBlog).expect(400);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
	mongoose.connection.close();
});
