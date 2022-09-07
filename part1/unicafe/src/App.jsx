import { useState } from 'react';

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	return (
		<div>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {average}</p>
			<p>positive {positive}</p>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodBtn = () => {
		setGood(good + 1);
	};

	const handleBadBtn = () => {
		setBad(bad + 1);
	};

	const handleNeutralBtn = () => {
		setNeutral(neutral + 1);
	};

	const all = good + bad + neutral;
	const average =
		good === 0 && bad === 0 && neutral === 0
			? 0
			: (good * 1 + neutral * 0 + bad * -1) / all;
	const positive =
		good === 0 && bad === 0 && neutral === 0 ? 0 : `${(good / all) * 100} %`;

	return (
		<div>
			<h1>give feedback</h1>
			<div>
				<button onClick={handleGoodBtn}>good</button>
				<button onClick={handleNeutralBtn}>neutral</button>
				<button onClick={handleBadBtn}>bad</button>
			</div>
			<h1>statistics</h1>
			<Statistics
				all={all}
				average={average}
				bad={bad}
				good={good}
				neutral={neutral}
				positive={positive}
			/>
		</div>
	);
};

export default App;
