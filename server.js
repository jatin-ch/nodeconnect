var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');

var secret = require('./config/secret');
var User = require('./models/user');

const socketEvents = require('./socketEvents');

var app = express();

mongoose.connect(secret.database, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:secret.secretKey,
  store: new MongoStore({ url:secret.database, authoReconnect:true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// app.use('nodeconnect', mainRoutes); // It means localhost:3000/nodeconnect will be url instead localhost:3000
var webRoutes = require('./routes/web');
var authRoutes = require('./routes/auth');
var postRoutes = require('./routes/post');
var chatRoutes = require('./routes/chat');
var adminRoutes = require('./routes/admin');
var storyRoutes = require('./routes/story');
var apiRoutes = require('./api/api');

app.use(webRoutes);
app.use(authRoutes);
app.use('/posts', postRoutes);
app.use('/chat', chatRoutes);
app.use(adminRoutes);
app.use(storyRoutes);
app.use('/api', apiRoutes);

let server;
server = app.listen(secret.port, function(err) {
  if(err) throw err;
  console.log("server is running on port " + secret.port);
});

const io = require('socket.io').listen(server);
socketEvents(io);
