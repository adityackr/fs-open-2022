import PropTypes from 'prop-types';

const SubmitButton = ({ text }) => {
	return <button type="submit">{text}</button>;
};

SubmitButton.propTypes = {
	text: PropTypes.string.isRequired,
};

export default SubmitButton;
