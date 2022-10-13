'use strict';

const dynamoose = require('dynamoose')

const peopleSchema = new dynamoose.Schema({
	id: String,
	name: String,
	phone: String,
});

const peopleModel = dynamoose.model('people', peopleSchema);
exports.handler = async (event) => {
console.log('EVENT BODY', event.body)

let parsedBody = JSON.parse(event.body);
let { id, name, phone} = parsedBody;

let people = {id, name, phone};
console.log('THIS IS A CONSOLE LOG -----', people);

    const response = { statusCode: null, body: null};
		
		try {
			let newPerson = await peopleModel.update(people);
			response.statusCode = 200;
			response.body = JSON.stringify(newPerson);
			
		} catch (e) {
			console.log(e);
			response.statusCode = 500;
			response.body = JSON.stringify(e.message);
		}
		return response;
	};