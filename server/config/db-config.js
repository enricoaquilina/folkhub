var mongoose = require('mongoose'),
    encrypt = require('../common/crypto/encrypt'),
    User = require('../models/UserModel'),
    Hub = require('../models/HubModel');

module.exports = function(app, config){
  //connect to mongoose
  mongoose.connect(config.connString);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function cb(){
    console.log('folkhub db opened..');
  });

  // app.listen(config.port, function(){
  //   console.log("App started on port " + config.port);
  // });
  app.timeout = 50000;
  User.createDefaultUsers();
  Hub.createDefaultHubs();
}
