import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import BlogInput from './components/BlogInput';
import LoginInput from './components/LoginInput';
import SubmitButton from './components/SumbitButton';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

	useEffect(() => {
		fetchBlogs();
	});

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const fetchBlogs = async () => {
		const blogs = await blogService.getAll();
		setBlogs(blogs);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			await blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			console.log(exception);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		setUser(null);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		const oldState = JSON.parse(JSON.stringify(newBlog));
		oldState[name] = value;
		setNewBlog(oldState);
	};

	const handleAddBlog = (e) => {
		e.preventDefault();
		const newBlogWithId = {
			...newBlog,
			id: (Math.floor(Math.random()) * 1000000).toString(),
		};

		blogService.create(newBlogWithId).then((returnedBlog) => {
			setBlogs([...blogs, newBlogWithId]);
			Object.keys(newBlog).map((key) => (newBlog[key] = ''));
		});
	};

	const loginForm = () => (
		<div>
			<h1>login to application</h1>
			<form onSubmit={handleLogin}>
				<LoginInput
					text={'username'}
					type={'text'}
					value={username}
					name={'Username'}
					onChange={({ target }) => setUsername(target.value)}
				/>
				<LoginInput
					text={'password'}
					type={'password'}
					value={password}
					name={'Password'}
					onChange={({ target }) => setPassword(target.value)}
				/>
				<SubmitButton text={'Login'} />
			</form>
		</div>
	);

	const blogForm = () => (
		<form onSubmit={handleAddBlog}>
			<BlogInput name={'title'} value={newBlog.title} onChange={handleChange} />
			<BlogInput
				name={'author'}
				value={newBlog.author}
				onChange={handleChange}
			/>
			<BlogInput name={'url'} value={newBlog.url} onChange={handleChange} />
			<SubmitButton text={'create'} />
		</form>
	);

	return (
		<div>
			{user === null ? (
				loginForm()
			) : (
				<div>
					<h2>blogs</h2>
					<p>
						{user.name} logged-in <button onClick={handleLogout}>logout</button>
					</p>
					<h2>Create New</h2>
					<div>{blogForm()}</div>
					<div>
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
