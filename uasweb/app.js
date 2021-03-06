var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var mongoose = require('mongoose');

var admin   = require('./routes/admin');
var users   = require('./routes/index');
var member  = require('./routes/member');
var pemesan  = require('./routes/pemesanan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"rahasia"}));
app.use(flash());

app.use('/', admin);
app.use('/', users);
app.use('/', member);
app.use('/', pemesan);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tokolaptop');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    return res.redirect('/')
});

module.exports = app;
