import PropTypes from 'prop-types';

const LoginInput = ({ value, onChange, type, name, text }) => {
	return (
		<div>
			{text}
			<input type={type} value={value} name={name} onChange={onChange} />
		</div>
	);
};

LoginInput.propTypes = {
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default LoginInput;
