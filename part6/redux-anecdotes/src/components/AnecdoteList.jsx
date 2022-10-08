import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(addVote(id));
	};

	return (
		<div>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<Anecdote
						anecdote={anecdote}
						key={anecdote.id}
						handleClick={() => vote(anecdote.id)}
					/>
				))}
		</div>
	);
};

export default AnecdoteList;
