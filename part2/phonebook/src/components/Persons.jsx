const Persons = ({ filteredPerson, handleDeleteBtn }) => {
	return (
		<div>
			{filteredPerson.map((person) => (
				<div key={person.id}>
					<p>
						{person.name} {person.number}{' '}
						<input
							name={person.name}
							id={person.id}
							type="button"
							value="delete"
							onClick={handleDeleteBtn}
						/>
					</p>
				</div>
			))}
		</div>
	);
};

export default Persons;
