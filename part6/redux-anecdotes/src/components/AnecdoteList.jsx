import { useDispatch, useSelector } from 'react-redux';
import { anecdoteToUpdate } from '../reducers/anecdoteReducer';
import { setNotiFication } from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => [...state.anecdotes]);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const vote = (id) => {
		const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
		dispatch(anecdoteToUpdate(anecdote));
		dispatch(setNotiFication(`You voted '${anecdote.content}'`, 3000));
	};

	return (
		<div>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.filter((a) => a.content.toLowerCase().includes(filter))
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
