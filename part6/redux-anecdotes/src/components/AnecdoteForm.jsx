import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
	hidNotification,
	showNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		console.log(content);
		dispatch(createAnecdote(content));
		dispatch(showNotification(`New anecdote added: ${content}`));
		setTimeout(() => dispatch(hidNotification()), 3000);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
