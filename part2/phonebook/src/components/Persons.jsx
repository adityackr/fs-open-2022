const Persons = ({ filteredPerson }) => {
	return (
		<div>
			{filteredPerson.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default Persons;
