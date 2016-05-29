var http = require('http'),
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
  var redisSession, host, port, publisher,redisClient1, subscriber;

  if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);

    // host = "redis://redistogo:df3994bfcc3f703ee6a216c5ffa28cf0@"+rtg.host;
    host = rtg.hostname;
    port = rtg.port;

    var redis_url = require('url').parse(process.env.REDISTOGO_URL)
    redisClient1 = require('redis').createClient(redis_url.port, redis_url.hostname, {auth_pass: redis_url.auth.split(":")[1]});


    // redisSession.auth(rtg.auth.split(":")[1]);
    subscriber = require('redis').createClient(redis_url.port, redis_url.hostname, {auth_pass: redis_url.auth.split(":")[1]});
    // client2.auth(rtg.auth.split(":")[1]);
  } else {
    redisSession = redis.createClient();
    host = '127.0.0.1';
    port = '6379';
    subscriber = redis.createClient();
  }

  subscriber.subscribe('test');
  subscriber.on('message', function(channel, message){
    console.log('received '+message);
  })
  var clients = [];
  var wss = new WebSocketServer({server: app,  port:5001});

  wss.on('connection', function conn(ws){
    // var location = url.parse(ws.upgradeReq.url, true);
    console.log('websocket connection success');

    ws.on('message', function incoming(message){
      ws.broadcast(message);
    });

    ws.on('close', function(){
      console.log('websocket closed');
    });

    ws.broadcast = function broadcast(data){
      clients.forEach(function each(client){
        // console.log(data);
        client.send(data);
      });
    };
    clients.push(ws);
  });

  //set the views property to the path where im gonna hold my views
  //since it's gonna be a SPA views have been put in server folder

  app.set("views", config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  app.set('trust proxy', 1) // trust first proxy
  app.set('transports', 'websocket')
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
