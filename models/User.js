'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

// Define schema
const userSchema = mongoose.Schema({
	name: { type: String, index: true} ,
	email: { type: String, unique: true, index: true },
	key: String,
	salt: String
});

// method to set salt and hash the password for a user
// setPassword method first creates a salt unique for every user
// then it hashes the salt with user password and creates a hash
// this hash is stored in the database as user password
userSchema.methods.setPassword = function (password) {

	// creating a unique salt for a particular user
	this.salt = crypto.randomBytes(16).toString('hex');

	// hashing user's salt and password with 1000 iterations,
	// 64 length and sha512 digest
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// method to check entered password is correct or not
// validPassword method checks whether the user
// password is correct or not
// It takes the user password from the request 
// and salt from user database entry
// It then hashes user password and salt
// then checks if this generated hash is equal
// to user's hash in the database or not
// if user's hash is equal to generated hash 
// then password is correct otherwise not
userSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
};

// Create user model
const User = mongoose.model('User', userSchema);

module.exports = User;