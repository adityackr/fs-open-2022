import { useState } from 'react';
import BlogInput from './BlogInput';
import SubmitButton from './SubmitButton';

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		const oldState = JSON.parse(JSON.stringify(newBlog));
		oldState[name] = value;
		setNewBlog({ ...oldState });
	};

	const handleAddBlog = (e) => {
		e.preventDefault();
		createBlog({
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		});

		Object.keys(newBlog).map((key) => (newBlog[key] = ''));
	};

	return (
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
};

export default BlogForm;
