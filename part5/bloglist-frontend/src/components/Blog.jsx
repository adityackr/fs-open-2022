import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ blog, updatedLike, deleteBlog }) => {
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

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog.id);
		}
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
			<div className="blogContents" style={hideWhenVisible}>
				{blog.title} - {blog.author}{' '}
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
				{blog.title} <button onClick={toggleVisibility}>hide</button>
				<p>
					URL - <a href={blog.url}>{blog.url}</a>
				</p>
				<p>
					likes - {blog.likes}{' '}
					<button id="like-btn" onClick={handleLikes}>
						like
					</button>
				</p>
				<p>author - {blog.author}</p>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updatedLike: PropTypes.func.isRequired,
	deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
