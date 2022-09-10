import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Aditya Chakraborty', number: '+8801711111111' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

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

	return (
		<div>
			<h2>PhoneBook</h2>
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
				{persons.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
