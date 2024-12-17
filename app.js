var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodbIndex = require('./mongo');

var indexRouter = require('./routes/index');
var livesRouter = require('./routes/lives');
var panRouter = require('./routes/pan');
var labRouter = require('./routes/lab');
var autoxRouter = require('./routes/autox');
var gameRouter = require('./routes/game');
var timetableRouter = require('./routes/timetable');
var toolsRouter = require('./routes/tools');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', toolsRouter);
app.use('/lives', livesRouter);
app.use('/pan', panRouter);
app.use('/lab', labRouter);
app.use('/autox', autoxRouter);
app.use('/game', gameRouter);
app.use('/timetable', timetableRouter);


// 禁止上传文件
app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    // 如果内容类型是 multipart/form-data，返回 403 禁止访问
    res.status(403).send('File uploads are not allowed.(人话：死呀瞎上传文件)');
  } else {
    // 否则继续处理请求
    next();
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = app;
