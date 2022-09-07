import { useState } from 'react';

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	];

	const n = anecdotes.length;
	const points = new Array(n).fill(0);

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState([...points]);

	const handleNextBtn = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length));
	};

	const handleVoteBtn = () => {
		votes[selected] += 1;
		setVotes([...votes]);
	};

	const maxVotes = Math.max(...votes);
	const indexOfMax = votes.indexOf(maxVotes);

	return (
		<div>
			<h1>Anecdotes of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={handleVoteBtn}>votes</button>
			<button onClick={handleNextBtn}>next anecdotes</button>
			<h1>Anecdotes with most votes</h1>
			<p>{anecdotes[indexOfMax]}</p>
			<p>has {votes[indexOfMax]} votes</p>
		</div>
	);
};

export default App;
