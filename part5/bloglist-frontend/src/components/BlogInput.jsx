const BlogInput = ({ value, name, onChange }) => {
	return (
		<div>
			{name}
			<input type="text" value={value} name={name} onChange={onChange} />
		</div>
	);
};

export default BlogInput;
