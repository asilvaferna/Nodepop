'use strict';

const mongoose = require('mongoose');

// Define schema
const userSchema = mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	key: String
});

// Create user model
const User = mongoose.model('User', userSchema);


module.exports = User;