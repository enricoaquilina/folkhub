var express = require('express');
var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var config = require('./server/config/config')[env];

var clients = require('./server/config/redisClients');

require('./server/config/websocket')(app, config, clients);

require('./server/config/express')(app, config, clients);

require('./server/config/db-config')(app, config);

require('./server/config/passport')();

require('./server/config/routes')(app);




/*add a route which delivers the index page for all routes
asterisk will match all routes which are not previously defined
(kinda like the default in a switch statement)
*/
