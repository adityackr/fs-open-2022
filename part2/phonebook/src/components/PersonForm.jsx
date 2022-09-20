import { useState } from 'react';
import personsService from '../services/persons';

const PersonForm = ({ persons, setPersons, notification, setNotification }) => {
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newPersonObj = {
			name: newName,
			number: newNumber,
		};
		const personsArr = persons.map((person) => person.name);
		if (personsArr.includes(newPersonObj.name)) {
			const confirmation = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);

			const personToUpdate = persons.filter(
				(person) => person.name === newPersonObj.name
			);

			if (confirmation) {
				personsService
					.update(personToUpdate[0].id, newPersonObj)
					.then((returnedData) => {
						const index = persons.findIndex(
							(person) => person.name === returnedData.name
						);
						persons.splice(index, 1, returnedData);
						setPersons([...persons]);
						setNewName('');
						setNewNumber('');
					});
			}
		} else {
			personsService.create(newPersonObj).then((returnedData) => {
				setPersons([...persons, returnedData]);
				setNewName('');
				setNewNumber('');
			});
		}

		setNotification(`Added ${newPersonObj.name}`);
		setTimeout(() => {
			setNotification(null);
		}, 5000);
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
