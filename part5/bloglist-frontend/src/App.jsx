import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginInput from './components/LoginInput';
import SubmitButton from './components/SumbitButton';
import Toggle from './components/Toggle';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState('');
	const [error, setError] = useState('');

	const blogFormRef = useRef();

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
			setError('wrong username or password');
			setTimeout(() => setError(''), 3000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		setUser(null);
	};

	const handleAddBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility();
		const blog = await blogService.create(blogObject);
		setNotification(`a new blog ${blog.title} by ${blog.author} added`);
		setTimeout(() => setNotification(''), 3000);
	};

	const handleLikes = async (id, blogObject) => {
		await blogService.update(id, blogObject);

		// const updatedBlog = {
		// 	...blogObject,
		// 	id,
		// };

		blogs.splice(
			blogs.findIndex((blog) => blog.id === id),
			0,
			blogObject
		);

		setBlogs([...blogs]);
	};

	const loginForm = () => (
		<div>
			<h1>login to application</h1>
			{error && <p className="error">{error}</p>}
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
		<Toggle buttonLabel={'create new blog'} ref={blogFormRef}>
			<BlogForm createBlog={handleAddBlog} />
		</Toggle>
	);

	return (
		<div>
			{user === null ? (
				loginForm()
			) : (
				<div>
					<h2>blogs</h2>
					{notification && <p className="notification">{notification}</p>}
					<p>
						{user.name} logged-in <button onClick={handleLogout}>logout</button>
					</p>
					<h2>Create New</h2>
					<div>{blogForm()}</div>
					<div>
						{blogs.map((blog) => (
							<Blog updatedLike={handleLikes} key={blog.id} blog={blog} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;