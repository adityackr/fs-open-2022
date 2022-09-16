import axios from 'axios';

const baseUrl = 'https://acphonebook.fly.dev/api/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (newPerson) => {
	const request = axios.post(baseUrl, newPerson);
	return request.then((response) => response.data);
};

const deleteData = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
	// return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((respose) => respose.data);
};

export default { getAll, create, deleteData, update };
