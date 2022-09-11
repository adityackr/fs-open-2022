const Country = ({ filteredCountries }) => {
	const country = filteredCountries[0];
	return (
		<div>
			{filteredCountries.length === 1 && (
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
					<img
						style={{ backgroundColor: 'darkgray', padding: '1rem' }}
						src={country.flags.png}
						alt=""
					/>
				</div>
			)}
		</div>
	);
};

export default Country;
