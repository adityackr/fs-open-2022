import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newPersonObj = { name: newName, number: newNumber };
		const personsArr = persons.map((person) => person.name);
		if (personsArr.includes(newPersonObj.name)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons([...persons, newPersonObj]);
		}
	};

	const handleNameInputChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberInputChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleSearchInputChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredPerson = persons.filter((person) =>
		person.name.toLowerCase().includes(search)
	);

	return (
		<div>
			<h2>PhoneBook</h2>
			<input type="search" value={search} onChange={handleSearchInputChange} />
			<h2>add new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleNameInputChange} />
					<br />
					<br />
					number: <input value={newNumber} onChange={handleNumberInputChange} />
				</div>
				<br />
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers:</h2>
			<div>
				{filteredPerson.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
