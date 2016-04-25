var server = require('http').createServer(),
    express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    url = require('url'),
    WebSocketServer = require('ws').Server;

module.exports = function(app, config){
  //compile function for stylus which gets used by the middleware
  function compile(str, path){
    return stylus(str).set('filename', path);
  }
  var wss = new WebSocketServer({server: app, path:'/', port:5001});

  wss.on('connection', function connection(ws){
    // var location = url.parse(ws.upgradeReq.url, true);
    console.log('here');
    console.log(ws);
    ws.on('message', function incoming(message){
      console.log('received', message);
    });
    ws.send('something');
  })
  //set the views property to the path where im gonna hold my views
  //since it's gonna be a SPA views have been put in server folder

  app.set("views", config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  //this is saying that when a request comes in requesting the public directory
  //go ahead and serve the file.
  app.use(express.static(config.rootPath + '/public'));
  // app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  app.use(session({
    secret: 'best app on the internets!',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //configure stylus middleware itself
  app.use(stylus.middleware(
    {
      src: config.rootPath + '/public',
      compile: compile
    }
  ));

}
