const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose
	.connect(uri)
	.then((result) => {
		console.log('Connecting to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message);
	});

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

personSchema.set('toJSON', {
	transform: (document, returnedData) => {
		returnedData.id = returnedData._id.toString();
		delete returnedData._id;
		delete returnedData.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
