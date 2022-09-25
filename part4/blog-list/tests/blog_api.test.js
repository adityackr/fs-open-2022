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

afterAll(() => {
	mongoose.connection.close();
});
