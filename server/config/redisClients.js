var redis = require('redis');

var publisher, subscriber, host, port;
if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  console.log('here');
  host = rtg.hostname;
  port = rtg.port;

  publisher = redis.createClient(rtg.port, rtg.hostname,
    {
      auth_pass: rtg.auth.split(":")[1]
    });
  subscriber = redis.createClient(rtg.port, rtg.hostname,
    {
      auth_pass: rtg.auth.split(":")[1]
    });
} else {
  host = '127.0.0.1';
  port = '6379';
  publisher = redis.createClient();
  subscriber = redis.createClient();
}

module.exports = {
  // clients: {
  //   publisher: publisher,
  //   subscriber: subscriber
  // }

  subscriber: require('redis').createClient()

}
