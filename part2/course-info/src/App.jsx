const Header = ({ course }) => {
	return (
		<div>
			<h1>{course}</h1>
		</div>
	);
};

const Part = ({ name, exercises }) => {
	return (
		<div>
			<p>
				{name} {exercises}
			</p>
		</div>
	);
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			))}
		</div>
	);
};

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

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				id: 1,
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				id: 2,
				name: 'Using props to pass data',
				exercises: 7,
			},
			{
				id: 3,
				name: 'State of a Component',
				exercises: 14,
			},
			{
				id: 4,
				name: 'Redux',
				exercises: 11,
			},
		],
	};

	return (
		<div>
			<Course course={course} />
		</div>
	);
};

export default App;
