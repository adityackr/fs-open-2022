require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

const errorHandler = (error, req, res, next) => {
	console.log(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	next(error);
};

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(errorHandler);

morgan.token('body', (req) => JSON.stringify(req.body));

app.get('/api/persons', (req, res) => {
	Person.find({})
		.then((persons) => res.json(persons))
		.catch((error) => console.log(error.message));
});

app.post('/api/persons', (req, res) => {
	const body = req.body;

	// if (persons.map((p) => p.name).includes(body.name)) {
	// 	return res.status(400).json({
	// 		error: 'name already exists',
	// 	});
	// } else if (persons.map((p) => p.number).includes(body.number)) {
	// 	return res.status(400).json({
	// 		error: 'number already exists',
	// 	});
	// } else if (!body.name || !body.number) {
	// 	return res.status(400).json({
	// 		error: 'name or number missing',
	// 	});
	// }

	if (body.name === undefined || body.number === undefined) {
		return res.status(400).json({ error: 'name or number missing' });
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save().then((savedPerson) => res.json(savedPerson));

	// res.json(person);
});

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then((updatedPerson) => {
			res.json(updatedPerson);
		})
		.catch((error) => next(error));
});

app.get('/', (req, res) => {
	res.send('');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
