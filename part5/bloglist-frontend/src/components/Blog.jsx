import { useState } from 'react';

const Blog = ({ blog, updatedLike }) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleLikes = () => {
		const { user, author, url, title, likes } = blog;

		const updatedBlog = {
			title,
			likes: likes + 1,
			author,
			url,
			user: user,
		};

		updatedLike(blog.id, updatedBlog);
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible}>
				{blog.title} <button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
				{blog.title} <button onClick={toggleVisibility}>hide</button>
				<p>
					URL - <a href={blog.url}>{blog.url}</a>
				</p>
				<p>
					likes - {blog.likes} <button onClick={handleLikes}>like</button>
				</p>
				<p>author - {blog.author}</p>
			</div>
		</div>
	);
};

export default Blog;
