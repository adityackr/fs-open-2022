import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => Number(100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			const content = action.payload;
			state.push({
				content,
				id: getId(),
				votes: 0,
			});
		},
		addVote(state, action) {
			const id = action.payload;
			const anecdoteToUpdate = state.find((a) => a.id === id);
			const updatedAnecdote = {
				...anecdoteToUpdate,
				votes: anecdoteToUpdate.votes + 1,
			};
			return state.map((anecdote) =>
				anecdote.id !== id ? anecdote : updatedAnecdote
			);
		},
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

// const anecdoteReducer = (state = initialState, action) => {
// 	// console.log('state now: ', state);
// 	// console.log('action', action);

// 	if (action.type === 'VOTE') {
// 		const { id } = action.data;
// 		const anecdoteToUpdate = state.find((a) => a.id === id);
// 		const updatedAnecdote = {
// 			...anecdoteToUpdate,
// 			votes: anecdoteToUpdate.votes + 1,
// 		};
// 		return state.map((anecdote) =>
// 			anecdote.id !== id ? anecdote : updatedAnecdote
// 		);
// 	} else if (action.type === 'NEW_ANECDOTE') {
// 		return [...state, action.data];
// 	}

// 	return state;
// };

// export const createAnecdote = (content) => {
// 	return {
// 		type: 'NEW_ANECDOTE',
// 		data: {
// 			content,
// 			id: getId(),
// 			votes: 0,
// 		},
// 	};
// };

// export const addVote = (id) => {
// 	return {
// 		type: 'VOTE',
// 		data: { id },
// 	};
// };

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
