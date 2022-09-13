import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		personsService.getAll().then((initialData) => setPersons(initialData));
	}, []);

	const handleSearchInputChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredPerson = persons.filter((person) =>
		person.name.toLowerCase().includes(search)
	);

	const handleDeleteBtn = (e) => {
		const confirmation = window.confirm(`Delete ${e.target.name}?`);

		if (confirmation) {
			personsService.deleteData(e.target.id).then((response) => {
				// const index = persons.findIndex((person) => person.id === e.target.id);
				const newObject = filteredPerson.filter(
					(person) => person.id !== e.target.id
				);
				setPersons([...newObject]);
			});
		}
	};

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
				<Persons
					filteredPerson={filteredPerson}
					handleDeleteBtn={handleDeleteBtn}
				/>
			</div>
		</div>
	);
};

export default App;
