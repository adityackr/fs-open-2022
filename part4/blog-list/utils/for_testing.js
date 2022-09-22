const reverse = (string) => {
	return string.split('').reverse().join('');
};

const average = (array) => {
	return array.reduce((sum, item) => sum + item, 0);
};

module.exports = {
	reverse,
	average,
};
