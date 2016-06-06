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

module.exports = function(app, config, clients){
  //compile function for stylus which gets used by the middleware

  function compile(str, path){
    return stylus(str).set('filename', path);
  }
  // if (process.env.REDISTOGO_URL) {
  //   var rtg = require("url").parse(process.env.REDISTOGO_URL);
  //
  //   host = rtg.hostname;
  //   port = rtg.port;
  // } else {
  //   host = '127.0.0.1';
  //   port = '6379';
  //   subscriber = redis.createClient();
  // }

  // subscriber.subscribe('');
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
      client: clients.sessionstore,
      ttl: 260
    }
  ),
    saveUninitialized: false,
    resave: false,
    secret: 'best app on the internets!'
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
