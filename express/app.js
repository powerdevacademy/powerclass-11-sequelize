var express = require('express');
var logger = require('morgan');
const cors = require('cors');

const verifyToken = require('./middlewares');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', verifyToken, usersRouter);

module.exports = app;
