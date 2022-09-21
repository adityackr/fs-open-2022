const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const uri = process.env.MONGODB_URL;

mongoose
	.connect(uri)
	.then(() => {
		console.log('Connecting to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message);
	});

const personSchema = new mongoose.Schema({
	name: { type: String, minLength: 3, required: true },
	number: {
		type: String,
		minLength: 8,
		required: true,
		validate: {
			validator: function (v) {
				return /^\d{2,3}-\d+$/.test(v);
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},
});

personSchema.set('toJSON', {
	transform: (document, returnedData) => {
		returnedData.id = returnedData._id.toString();
		delete returnedData._id;
		delete returnedData.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
