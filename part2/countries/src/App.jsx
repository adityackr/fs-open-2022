import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from './components/Countries';
import Country from './components/Country';
import Search from './components/Search';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then((response) => setCountries(response.data));
	}, []);

	const handleSearchInputChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(search)
	);

	return (
		<div>
			<div>
				<Search
					search={search}
					handleSearchInputChange={handleSearchInputChange}
				/>
				<Countries filteredCountries={filteredCountries} search={search} />
				<Country filteredCountries={filteredCountries} />
			</div>
		</div>
	);
};

export default App;
