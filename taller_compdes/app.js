
// all environments
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({secret: 'keyboard cat'}));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/profile', profile);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var connection = mysql.createConnection({
    user: 'adminSesiones',
    password: 'admin123', 
    host: 'localhost',
    port: 3306, 
    database: 'sesiones'
});

connection.connect(function(err) {
    if (err) {
        console.log("error conexion con la base de datos"); 
    } else {
        console.log("conexion exitosa con la base de datos");    
    } 
});

module.exports = app;
module.exports.connection = connection;



