const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const bcrypt = require('bcryptjs');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({});

		await Blog.insertMany(helper.initialBlogs);
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
	let token = null;
	beforeAll(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('password', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();

		// Login user to get token
		await api
			.post('/api/login')
			.send({ username: 'root', password: 'password' })
			.then((res) => {
				return (token = res.body.token);
			});

		return token;
	}, 100000);

	test('succeeds with valid data', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const newBlog = {
			title: 'Lecture 42 - React Custom Hooks',
			author: 'Aditya Chakraborty',
			url: 'https://stacklearner.com/lecture-42-react-custom-hooks',
		};

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		const blogToCompare = blogsAtEnd[blogsAtEnd.length - 1];
		expect(blogToCompare.likes).toBe(0);
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

		newBlog.id = blogToCompare.id;
		newBlog.likes = blogToCompare.likes;

		expect(blogToCompare.title).toBe(newBlog.title);
	});

	test('blog without title and url cannot be added', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const newBlog = {
			author: 'Aditya Chakraborty',
		};

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(400);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
	});

	test('unauthorized user cannot create a blog', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const newBlog = {
			title: 'New blog',
			author: 'Jane Doe',
			url: 'http://dummyurl.com',
		};

		token = null;

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(401);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
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

describe('adding a user', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();
	}, 100000);

	test('create fails with proper status code when username or password is missing', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: '',
			name: 'xyz',
			password: '',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('missing username or password');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('create fails with proper status code when username or password is not at least 3 characters long', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'a',
			name: 'xyz',
			password: 'b',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain(
			'username or password must be at least 3 characters long'
		);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
