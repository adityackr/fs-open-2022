const Search = ({ search, handleSearchInputChange }) => {
	return (
		<div>
			find countries <input value={search} onChange={handleSearchInputChange} />
		</div>
	);
};

export default Search;
