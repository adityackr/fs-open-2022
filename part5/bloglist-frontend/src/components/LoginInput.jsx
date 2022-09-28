const LoginInput = ({ username, onChange, type, name, text }) => {
	return (
		<div>
			{text}
			<input type={type} value={username} name={name} onChange={onChange} />
		</div>
	);
};

export default LoginInput;
