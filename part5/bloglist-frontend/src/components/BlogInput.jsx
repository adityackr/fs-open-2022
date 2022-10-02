import PropTypes from 'prop-types';

const BlogInput = ({ value, name, onChange }) => {
	return (
		<div>
			{name}
			<input type="text" value={value} name={name} onChange={onChange} />
		</div>
	);
};

BlogInput.propTypes = {
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default BlogInput;
