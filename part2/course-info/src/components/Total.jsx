const Total = ({ parts }) => {
	const total = parts.reduce((acc, cur) => {
		acc += cur.exercises;
		return acc;
	}, 0);
	return (
		<div>
			<p>
				<strong>total of {total} exercises</strong>
			</p>
		</div>
	);
};

export default Total;
