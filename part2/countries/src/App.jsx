import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from './components/Countries';
import Country from './components/Country';
import Search from './components/Search';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then((response) => setCountries(response.data));
	}, []);

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(search.toLowerCase())
	);

	const matchedCountry = countries.filter((country) =>
		country.name.common.includes(search)
	);

	const handleSearchInputChange = (e) => {
		setSearch(e.target.value);
		if (e.target.value === '') {
			setShow(false);
		} else {
			setShow(true);
		}
	};

	const handleButtonClick = (e) => {
		setSearch(e.target.id);
	};

	// console.log(matchedCountry);

	return (
		<div style={{ width: '300px', margin: 'auto' }}>
			<div>
				<Search
					search={search}
					handleSearchInputChange={handleSearchInputChange}
				/>

				<Countries
					filteredCountries={filteredCountries}
					search={search}
					handleButtonClick={handleButtonClick}
				/>

				{show && matchedCountry && (
					<Country filteredCountries={filteredCountries} />
				)}
			</div>
		</div>
	);
};

export default App;
