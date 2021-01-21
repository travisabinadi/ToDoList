var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');

var storeRouter = require('./routes/store');

var app = express();
const whitelist =
[
  'http://localhost:3000', 'http://localhost:9000','https://todo-list-kadince.herokuapp.com/'
]
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.get("/store", function (req, res, next) {
  let rawdata = fs.readFileSync('ToDoList.json');
  var store = JSON.parse(rawdata);
  res.send(store);
});

app.post("/store", (req, res, next) => {
  var store = JSON.stringify(req.body);
  fs.writeFile(path.join(__dirname, '../ToDoList.json'),
    store,
    error => (error) ?
      console.log("Error saving state!", error) :
      null
  )
  return res.send("You Successfully Posted the Store!")
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Handle React routing, return all requests to React app
app.get('/*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/client', 'index.html'));
  next();
});




// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
