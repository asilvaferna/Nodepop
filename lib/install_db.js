'use strict';

var mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load model
var Advertisement = require('../models/Advertisement');
var User = require('../models/User');

// An array that contains the ads
var advertisements;

// An array that contains the users
const users = [{ 'name': 'Adrian', 'email': 'adrian@nodepop.es', 'key': 'password' }];

// Parse JSON file and return a promise with an array of ads
function getAdvertisements(callback) {
	const file = path.join(__dirname, '../advertisements.json');

	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			callback(err);
			return;
		}

		let ads;
		try {
			ads = JSON.parse(data);
		} catch (error) {
			callback(error);
		}

		callback(null, ads);
	});
}

getAdvertisements((err, ads) => {
	if (err) {
		console.log('There was an error:', err); // eslint-disable-line no-console
		return;
	}

	advertisements = ads.ads;
});

// Connect to mongoDB and insert ads
mongoose.connect('mongodb://localhost:27017/nodepop')
	.then(async () => {
		try {
			// Delet the Ads and then insert new ones.
			await Advertisement.collection.drop()
				.then(Advertisement.collection.insertMany(advertisements, (err) => {
					if (err) {
						console.log(err); // eslint-disable-line no-console
						return;
					}
					console.log('Ads Collection created.'); // eslint-disable-line no-console
					mongoose.connection.close();
				}));
		} catch (err) {
			console.log('Ups! There was an error loading the Ads Collections.'); // eslint-disable-line no-console
			return;
		}
	});

// Connect to mongoDB and insert users
mongoose.connect('mongodb://localhost:27017/nodepop')
	.then(async () => {
		try {
			// Delet the Users and then insert new ones.
			await User.collection.drop()
				.then(User.collection.insert(users, (err) => {
					if (err) {
						console.log(err); // eslint-disable-line no-console
						return;
					}
					console.log('Users Collection created.'); // eslint-disable-line no-console
					mongoose.connection.close();
				}));
		} catch (err) {
			console.log('Ups! There was an error loading the Users Collection.'); // eslint-disable-line no-console
			return;
		}
	});