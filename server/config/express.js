var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    redis = require('redis'),
    passport = require('passport'),
    url = require('url'),
    WebSocketServer = require('ws').Server;

module.exports = function(app, config, req, res, next){
  //compile function for stylus which gets used by the middleware
  function compile(str, path){
    return stylus(str).set('filename', path);
  }
  var redisClient1;

  // subscriber.on('message', function(channel, message){
  //   //send message
  //   ws.send(message)
  // })

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
    store: new RedisStore({
      // host: host,
      // port: port,
      client: redisClient1,
      ttl: 260
    }
  ),
    saveUninitialized: false,
    resave: false,
    secret: 'best app on the internets!'
  }));
  // app.use(session({
  //   secret: 'keyboard cat',
  //   resave: false,
  //   saveUninitialized: true,
  //   // cookie: {secure: true}
  // }))
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
