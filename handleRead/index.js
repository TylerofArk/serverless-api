'use strict';

const dynamoose = require('dynamoose')

const peopleSchema = new dynamoose.Schema({
	id: String,
	name: String,
	phone: String,
});

const peopleModel = dynamoose.model('people', peopleSchema)

exports.handler = async (event) => {

    console.log('*--- This is the handleRead function ---*', event.queryStringParameters)
    
		const response = {statusCode: null, body: null };

		try {
				let peopleRecords = await peopleModel.scan().exec();
				response.statusCode = 200;
				response.body = JSON.stringify(peopleRecords)

		} catch (e) {
				console.log(e);
				response.statusCode = 500;
				response.body = JSON.stringify(e.message);
		}
    return response;
};      
