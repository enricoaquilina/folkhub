var http = require('http'),
    url = require('url'),
    WebSocketServer = require('ws').Server,
    clients = {},
    numClients = 0,
    hubs = require('../controllers/hubs'),
    listClients = [];

module.exports = function(app, config, redisclients){
  var server = http.createServer(app);
  server.listen(config.port);

  var wss = new WebSocketServer({server: server});

  wss.on('connection', function conn(ws) {
    var ctr = numClients += 1;

    ws.id = ctr;
    listClients[ws.id] = ws;
    ws.send(JSON.stringify({
      clientID : ws.id
    }));

    config.listClients = listClients;
    // console.log(listClients);

    ws.on('message', function incoming(message){
      wss.roomBroadcast(message);
    });
    ws.on('close', function(ws){
      delete listClients[ws.id];
    })
    wss.roomBroadcast = function roomBroadcast(data) {
      var msgData = JSON.parse(data);
      // console.log(listClients);
      // return false;
      HubUserModel.find({hubname: msgData.hubname}).exec(function(err, collection){
        for (var i = 0; i < collection.length; i++) {
          listClients[collection[i].userid].send(data);
        }
      });
    };
    // wss.broadcast = function broadcast(data) {
    //   wss.clients.forEach(function each(client) {
    //     var msgData = JSON.parse(data);
    //     client.send(msgData.username+': '+msgData.message);
    //   });
    // };
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
