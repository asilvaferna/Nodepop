'use strict';

// create mongoose driver
const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
	console.log('MongoDB error', err); // eslint-disable-line no-console
});

// the first time 'open' event goes live do this:
conn.once('open', () => {
	console.log('Connected to MongoDB on', conn.name); // eslint-disable-line no-console
});

// URI string ~ similar to URL sintax
mongoose.connect('mongodb://localhost:27017/nodepop');

module.exports = conn;