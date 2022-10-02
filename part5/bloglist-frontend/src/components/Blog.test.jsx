import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog Component tests', () => {
	let component;
	const blog = {
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	};

	const mockUpdatedLike = jest.fn();
	const mockDeleteBlog = jest.fn();

	beforeEach(() => {
		component = render(
			<Blog
				blog={blog}
				deleteBlog={mockDeleteBlog}
				updatedLike={mockUpdatedLike}
			/>
		);
	});

	test('renders title and authors', () => {
		const div = component.container.querySelector('.blogContents');
		expect(div).toHaveTextContent('React patterns - Michael Chan');
	});

	test('clicking the view button displays url and number of likes', () => {
		const button = component.getByText('view');
		userEvent.click(button);

		expect(component.container).toHaveTextContent('https://reactpatterns.com/');
		expect(component.container).toHaveTextContent(7);
	});

	test('if the like button is clicked twice, the event handler is called twice', async () => {
		const viewButton = component.getByText('view');
		await userEvent.click(viewButton);

		const likeButton = component.getByText('like');
		await userEvent.click(likeButton);
		await userEvent.click(likeButton);

		expect(mockUpdatedLike.mock.calls).toHaveLength(2);
	});
});
