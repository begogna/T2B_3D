var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");

var home = require('./routes/home');
var index = require('./routes/index');
var catalogue = require('./routes/catalogue');
var aPropos = require('./routes/aPropos');

var app = express();

app.use(session({
    secret: 'Th3C00k',
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

app.use('/', home);
app.use('/index', index);
app.use('/catalogue', catalogue);
app.use('/aPropos', aPropos);


app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080, function () {
    console.log('Serveur connecté au port 8080');
});


module.exports = app;
