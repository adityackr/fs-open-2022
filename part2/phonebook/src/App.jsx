import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);

	const [search, setSearch] = useState('');

	const handleSearchInputChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredPerson = persons.filter((person) =>
		person.name.toLowerCase().includes(search)
	);

	return (
		<div>
			<h2>PhoneBook</h2>
			<Filter
				search={search}
				handleSearchInputChange={handleSearchInputChange}
			/>
			<h2>Add a new</h2>
			<PersonForm persons={persons} setPersons={setPersons} />
			<h2>Numbers:</h2>
			<div>
				<Persons filteredPerson={filteredPerson} />
			</div>
		</div>
	);
};

export default App;
