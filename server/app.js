var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); 
const {authUser} = require('./model/auth')
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');

var app = express();

// view engine setup
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  // res.header("Access-Control-Allow-Credentials",true);
  // res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('user'));
app.use(session({
  name:'user',
  resave: true,
  saveUninitialized: true,
  secret: 'secret',
  cookie: { maxAge: 60 * 1000 * 300 }
}))
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// app.use(authUser);
module.exports = app;
