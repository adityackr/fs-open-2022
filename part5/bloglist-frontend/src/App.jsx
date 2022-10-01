import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import LoginInput from './components/LoginInput';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

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
				<button type="submit">Login</button>
			</form>
		</div>
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
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
