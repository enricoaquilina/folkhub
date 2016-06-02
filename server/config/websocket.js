var http = require('http'),
    url = require('url'),
    WebSocketServer = require('ws').Server;

module.exports = function(app, config){
  var server = http.createServer(app);
  server.listen(config.port)
  console.log('http server listening on %d', config.port);

  var wss = new WebSocketServer({server: server});
  console.log('websocket server created..');

  var clients = [];
  wss.on('connection', function conn(ws){
    var location = url.parse(ws.upgradeReq.url, true);

    console.log('websocket connection success');
    clients.push(ws);
    console.log(clients.length+' clients in here!');

    ws.on('message', function incoming(message){
      ws.broadcast(message);
    });

    ws.on('close', function(){
      var index = clients.indexOf(ws);
      if(index > -1)
      {
        clients.splice(index, 1);
      }
      console.log('websocket closed');
    });

    ws.broadcast = function broadcast(data){
      clients.forEach(function each(client){
        client.send(data);
      });
    };
    // ws.on("pong", function(data) { // we received a pong from the client.
    //   console.log(data.toString());
    // });
    setInterval(function interval() {
      ws.ping('ping', {}, true);
    }, 5000);
  });

}
