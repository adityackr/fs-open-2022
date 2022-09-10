const Filter = ({ search, handleSearchInputChange }) => {
	return (
		<input type="search" value={search} onChange={handleSearchInputChange} />
	);
};

export default Filter;
