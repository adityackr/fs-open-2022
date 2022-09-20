import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [search, setSearch] = useState('');
	const [notification, setNotification] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

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
		const targetName = e.target.name;
		const targetId = e.target.id;
		const confirmation = window.confirm(`Delete ${targetName}?`);

		if (confirmation) {
			personsService
				.deleteData(targetId)
				.then((response) => {
					console.log(response);
					const newObject = persons.filter((person) => person.id !== targetId);
					setPersons(newObject);
				})
				.catch((error) => {
					setErrorMessage(
						`Information of ${targetName} has already been removed from the server`
					);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
					setPersons(persons.filter((p) => p.id !== targetId));
				});
		}
	};

	return (
		<div>
			<h2>PhoneBook</h2>
			{notification && (
				<Notification message={notification} customClass="notification" />
			)}
			{errorMessage && (
				<Notification message={errorMessage} customClass="error" />
			)}
			<Filter
				search={search}
				handleSearchInputChange={handleSearchInputChange}
			/>
			<h2>Add a new</h2>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				notification={notification}
				setNotification={setNotification}
			/>
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
