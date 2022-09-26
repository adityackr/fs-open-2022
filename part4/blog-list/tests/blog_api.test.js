const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	await Blog.insertMany(helper.initialBlogs);
}, 100000);

describe('when there is initially some blogs saved', () => {
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
});

describe('viewing a specific blog', () => {
	test('succeeds with a valid id', async () => {
		const blogsAtStart = await helper.blogsInDb();

		const blogToView = blogsAtStart[0];

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

		expect(resultBlog.body).toEqual(processedBlogToView);
	});

	test('fails with status code 404 if blog does not exist', async () => {
		const validNonExistingId = await helper.nonExistingId();

		const resultBlog = await api
			.get(`/api/blogs/${validNonExistingId}`)
			.expect(404);
	});

	test('fails with status code 400 id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445';

		await api.get(`/api/blogs/${invalidId}`).expect(400);
	});
});

describe('addition of a new blog', () => {
	test('succeeds with valid data', async () => {
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
		const blogToCompare = blogsAtEnd[blogsAtEnd.length - 1];
		expect(blogToCompare.likes).toBe(0);
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		newBlog.id = blogToCompare.id;
		newBlog.likes = blogToCompare.likes;

		expect(blogsAtEnd).toContainEqual(newBlog);
	});

	test('blog without title and url cannot be added', async () => {
		const newBlog = {
			author: 'Aditya Chakraborty',
		};

		await api.post('/api/blogs').send(newBlog).expect(400);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const titles = blogsAtEnd.map((b) => b.title);
		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe('Update a blog', () => {
	test('succeeds if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[0];
		const updatedLikes = {
			likes: 10,
		};

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedLikes)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd[0].likes).toBe(updatedLikes.likes);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
