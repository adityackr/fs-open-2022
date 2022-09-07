import { useState } from 'react';

const StatisticsLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	if (good === 0 && bad === 0 && neutral === 0) {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		);
	}
	return (
		<table>
			<tbody>
				<StatisticsLine text="good" value={good} />
				<StatisticsLine text="neutral" value={neutral} />
				<StatisticsLine text="bad" value={bad} />
				<StatisticsLine text="all" value={all} />
				<StatisticsLine text="average" value={average} />
				<StatisticsLine text="positive" value={positive} />
			</tbody>
		</table>
	);
};

const Button = ({ text, onClick }) => {
	return <button onClick={onClick}>{text}</button>;
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
	const average = (good * 1 + neutral * 0 + bad * -1) / all;
	const positive = `${(good / all) * 100} %`;

	return (
		<div>
			<h1>give feedback</h1>
			<div>
				<Button text="good" onClick={handleGoodBtn} />
				<Button text="neutral" onClick={handleNeutralBtn} />
				<Button text="bad" onClick={handleBadBtn} />
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
