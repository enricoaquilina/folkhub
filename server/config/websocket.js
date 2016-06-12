var http = require('http'),
    url = require('url'),
    WebSocketServer = require('ws').Server,
    clients = {},
    id = 0;

module.exports = function(app, config, redisclients){
  var server = http.createServer(app);
  server.listen(config.port);

  var wss = new WebSocketServer({server: server});

  wss.on('connection', function conn(ws) {
    var ctr = id++;
    clients[ctr] = ws;
    config.clients = clients;
    config.id = ctr;

    ws.on('message', function incoming(message){
      console.log(message);
      wss.broadcast(message);
    });
    // ws.on('close', function(){
    //   var index = clients.indexOf(ws);
    //   if(index > -1)
    //   {
    //     clients.splice(index, 1);
    //   }
    //   // console.log('websocket closed: '+clients.length);
    // });
    wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
        var msgData = JSON.parse(data);
        client.send(msgData.username+': '+msgData.message);
      });
    };

    // redisclients.subscriber.subscribe('test');
    // redisclients.subscriber.on('message', function(channel, message){
    //   ws.send(message);
    // })

    // ws.on("pong", function(data) { // we received a pong from the client.
    //   console.log('reply to '+data.toString()+' with pong');
    // });
    // setInterval(function interval() {
    //   ws.ping('ping', {}, true);
    //   redisclients.publisher.publish('test', 'testing the test publish interval');
    // }, 5000);
  });
}
