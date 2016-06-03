var redis = require('redis');

var publisher, subscriber, host, port;
console.log(process.env.REDISTOGO_URL);

if (process.env.REDISTOGO_URL) {
  console.log('rtg');
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
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
  console.log('local');
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

  subscriber: subscriber
  // require('redis').createClient()

}
