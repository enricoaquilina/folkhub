var http = require('http'),
    url = require('url'),
    WebSocketServer = require('ws').Server,
    clients = [];

module.exports = function(app, config, redisclients){
  var server = http.createServer(app);
  server.listen(config.port);

  console.log('http server listening on %d', config.port);
  var wss = new WebSocketServer({server: server});
  console.log('websocket server created..');

  wss.on('connection', function conn(ws){
    // var location = url.parse(ws.upgradeReq.url, true);
    // console.log(ws.upgradeReq.headers['sec-websocket-key']);

    clients.push(ws);
    redisclients.subscriber.subscribe('test');
    config.ws = ws;


    console.log('websocket connection success');
    console.log(clients.length + ' clients in here!');

    ws.on('message', function incoming(message){
        ws.broadcast(message);
    });

    redisclients.subscriber.on('message', function(channel, message){
      ws.send(message);
    })

    ws.on('close', function(){
      var index = clients.indexOf(ws);
      if(index > -1)
      {
        clients.splice(index, 1);
      }
      console.log('websocket closed: '+clients.length);
    });

    ws.broadcast = function broadcast(message){
      clients.forEach(function each(client){
        client.send(message);
      });
    };
    // ws.on("pong", function(data) { // we received a pong from the client.
    //   console.log('reply to '+data.toString()+' with pong');
    // });
    // setInterval(function interval() {
    //   ws.ping('ping', {}, true);
    //   redisclients.publisher.publish('test', 'testing the test publish interval');
    // }, 5000);
  });
}
