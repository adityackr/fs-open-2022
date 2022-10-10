import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotiFication } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
	const addAnecdote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		props.createAnecdote(content);
		props.setNotiFication(`New anecdote added: ${content}`, 3000);
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

export default connect(null, { createAnecdote, setNotiFication })(AnecdoteForm);
