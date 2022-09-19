const { Schema, model, connect, connection } = require('mongoose');

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://aditya:${password}@cluster0.usjbg.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new Schema({
	person: String,
	phone: String,
});

const Person = new model('Person', personSchema);

if (process.argv.length === 3) {
	connect(url)
		.then(() => {
			return Person.find({});
		})
		.then((result) => {
			console.log('phonebook:');
			result.forEach((p) => {
				console.log(p.person, p.phone);
			});
			connection.close();
		})
		.catch((err) => console.log(err));
}

if (process.argv.length === 5) {
	connect(url)
		.then((result) => {
			const person = new Person({
				person: process.argv[3],
				phone: process.argv[4],
			});
			return person.save();
		})
		.then(() => {
			console.log(
				`added ${process.argv[3]} number ${process.argv[4]} to phonebook`
			);
			return connection.close();
		})
		.catch((err) => console.log(err));
}
