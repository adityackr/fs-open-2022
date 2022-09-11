import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then((response) => setCountries(response.data));
	}, []);
	// console.log(countries);

	const handleSearchInputChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(search)
	);

	const renderedCountry = () => {
		const len = filteredCountries.length;
		if (len === 0 || search === '') {
			return <div>No countries found</div>;
		} else if (len > 10) {
			return <div>Too many matches, specify another filter</div>;
		} else if (len <= 10 && len > 1) {
			return filteredCountries.map((country) => (
				<div key={country.name.common}>{country.name.common}</div>
			));
		} else if (len === 1) {
			const country = filteredCountries[0];
			return (
				<div>
					<h1>{country.name.common}</h1>
					<p>capital: {country.capital[0]}</p>
					<p>area: {country.area} sqm.</p>
					<h3>languages</h3>
					<ul>
						{Object.values(country.languages).map((language) => (
							<li key={language}>{language}</li>
						))}
					</ul>
					<img src={country.flags.png} alt="" />
				</div>
			);
		}
	};
	return (
		<div>
			<div>
				find countries{' '}
				<input value={search} onChange={handleSearchInputChange} />
				{renderedCountry()}
			</div>
		</div>
	);
};

export default App;
