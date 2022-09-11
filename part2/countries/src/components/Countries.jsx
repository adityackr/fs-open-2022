const Countries = ({ filteredCountries, search, handleButtonClick }) => {
	const len = filteredCountries.length;
	const notLength = len === 0;
	const greaterThanTen = len > 10;
	const lessThanOrEqualTen = len <= 10 && len > 1;
	return (
		<div>
			{(notLength || !search) && <div>No countries found</div>}
			{greaterThanTen && search && (
				<div>Too many matches, specify another filter</div>
			)}
			{lessThanOrEqualTen &&
				filteredCountries.map((country) => (
					<div key={country.name.common}>
						{country.name.common}{' '}
						<input
							type="button"
							id={country.name.common}
							value="Show"
							onClick={handleButtonClick}
						/>
					</div>
				))}
		</div>
	);
};

export default Countries;
