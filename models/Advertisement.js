'use strict';

const mongoose = require('mongoose');

// Define schema
const advertisementSchema = mongoose.Schema({
	name: String,
	isForSale: Boolean,
	price: Number,
	picture: String,
	tags: [String]
});

// static method for listing agents
advertisementSchema.statics.list = function (filter, skip, limit, fields, sort) {
	// create query
	const query = Advertisement.find(filter);
	query.skip(skip);
	query.limit(limit);
	query.select(fields);
	query.sort(sort);

	// execute query and return a promise
	return query.exec();
};

// Create advertisement model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;