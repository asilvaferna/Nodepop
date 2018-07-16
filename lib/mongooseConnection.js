'use strict';

// create mongoose driver
const mongoose = require('mongoose');
const conn = mongoose.connection;

const localConfig = require('../localConfig');

conn.on('error', err => {
	console.log('MongoDB error', err); // eslint-disable-line no-console
});

// the first time 'open' event goes live do this:
conn.once('open', () => {
	console.log('Connected to MongoDB on', conn.name); // eslint-disable-line no-console
});

// URI string ~ similar to URL sintax
mongoose.connect(localConfig.mongoLocation);

module.exports = conn;