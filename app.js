var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').__express);

/**
 * Connection & models from Mongoose
 */
require('./lib/mongooseConnection');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API paths
app.use('/apiv1/advertisements', require('./routes/apiv1/advertisements'));
app.use('/apiv1/users', require('./routes/apiv1/users'));

app.locals.title = 'Nodepop';

// Application paths
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
	if (err.array) { // validation error
		err.status = 422;  // Unprocessable Entity
		const errInfo = err.array({ onlyFirstError: true })[0];
		err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
	}

	res.status(err.status || 500);
	// If API petition, respond with JSON
	if (isApi(req)) {
		res.json({ success: false, error: err.message });
		return;
	}

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.render('error');
});

function isApi(req) {
	return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
