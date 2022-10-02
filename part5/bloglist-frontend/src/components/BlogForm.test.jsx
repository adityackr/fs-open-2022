import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn();
	const { container } = render(<BlogForm createBlog={createBlog} />);

	const titleInput = container.querySelector('input[name="title"]');
	const authorInput = container.querySelector('input[name="author"]');
	const urlInput = container.querySelector('input[name="url"]');
	const sendButton = screen.getByText('create');

	await userEvent.type(titleInput, 'title');
	await userEvent.type(authorInput, 'author');
	await userEvent.type(urlInput, 'https://www.test.com');
	await userEvent.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].title).toBe('title');
	expect(createBlog.mock.calls[0][0].author).toBe('author');
	expect(createBlog.mock.calls[0][0].url).toBe('https://www.test.com');
});
