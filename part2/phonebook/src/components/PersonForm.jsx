import { useState } from 'react';

const PersonForm = ({ persons, setPersons }) => {
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
	);
};

export default PersonForm;
