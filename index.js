var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var homeRoute= require('./routes/home.route');
var workRoute= require('./routes/work.route');
var cardRoute= require('./routes/card.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser('adhahdcjh13255'));
app.use(express.static('public'));

io.on('connection', function(socket) {
  console.log("client connected" + socket.id);
});
app.get('/', function(req,res){
	res.render('index');
});

//app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/users', userRoute);
app.use('/auth',authRoute);
app.use('/home',homeRoute);
app.use('/work',workRoute);
app.use('/card',cardRoute);

server.listen(port, function(){
	console.log('Server listening on port '+ port);
});
global.socket=io;
