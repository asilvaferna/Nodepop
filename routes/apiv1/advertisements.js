'use strict';

const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/Advertisement');

// JWT Authentication
const jwtAuth = require('../../lib/jwtAuth');

// Get advertisements
router.get('/', jwtAuth(), async (req, res, next) => {
	try {
		const name = req.query.name;
		const isForSale = req.query.isForSale;
		const price = req.query.price;
		const tags = req.query.tags;
		const skip = parseInt(req.query.skip);
		const limit = parseInt(req.query.limit);
		const fields = req.query.fields;
		// sort will execute before the pagination
		const sort = req.query.sort;
		const filter = {};

		if (name) {
			filter.name = new RegExp('^' + name, 'i');
		}

		if (isForSale) {
			filter.isForSale = isForSale;
		}

		if (tags) {
			filter.tags = tags;
		}

		if (price) {
			if (price === '10-50') {
				filter.price = { '$gte': '10', '$lte': '50' };
			} else if (price === '10-') {
				filter.price = { '$gte': '10' };
			} else if (price === '-50') {
				filter.price = { '$lte': '50' };
			} else {
				filter.price = price;
			}
		}

		const advertisements = await Advertisement.list(filter, skip, limit, fields, sort);
		res.json({ success: true, result: advertisements });
	} catch (error) {
		next(error);
	}
});

// Get the list of tags
router.get('/tags', jwtAuth(), async (req, res, next) => {
	try {
		const getOnlyTags = { tags: 1, _id: 0 };
		const advertisements = await Advertisement.list({}, null, null, getOnlyTags, null);

		const duplicatedTags = [];

		for (let ad of advertisements) {
			const tags = ad.tags;
			for (let tag of tags) {
				duplicatedTags.push(tag);
			}
		}

		// remove duplicated tags
		const unduplicatedTags = Array.from(new Set(duplicatedTags));
		// Return a JSON with the tags unduplicated
		res.json({ success: true, result: unduplicatedTags });
	} catch (error) {
		next(error);
	}
});

module.exports = router;