var server = require('http').createServer(),
    express = require('express'),
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
  var redisSession, host, port, publisher;

  if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);

    host = "redis://redistogo:df3994bfcc3f703ee6a216c5ffa28cf0@"+rtg.host;
    // host = rtg.hostname;
    port = rtg.port;

    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    redisSession = require("redis").createClient(rtg.port, rtg.hostname);
    subscriber = redis.createClient(rtg.port, rtg.hostname);

    redisSession.auth(rtg.auth.split(":")[1]);
    subscriber.auth(rtg.auth.split(":")[1]);
  } else {
    redisSession = redis.createClient();
    host = '127.0.0.1';
    port = '6379';
    subscriber = redis.createClient(port, host);
  }
  var client2 = redis.createClient(port, host);

  subscriber.subscribe('test');
  subscriber.on('message', function(channel, message){
    console.log('received '+message);
  })
  // var clients = [];
  // var wss = new WebSocketServer({server: app,  port:5001});
  //
  // wss.on('connection', function connection(ws){
  //   // var location = url.parse(ws.upgradeReq.url, true);
  //   ws.on('message', function incoming(message){
  //     // console.log('received', message);
  //     ws.broadcast(message);
  //   });
  //   ws.on('close', function(){
  //     console.log('client disconnected');
  //   });
  //   ws.broadcast = function broadcast(data){
  //     clients.forEach(function each(client){
  //       // console.log(data);
  //       client.send(data);
  //     });
  //   };
  //   // var id = setInterval(function(){
  //   //   ws.send(JSON.stringify(process.memoryUsage()), function(){
  //   //
  //   //   })
  //   // }, 1500);
  //   clients.push(ws);
  // });

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
      host: host,
      port: port,
      client: client2,
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
