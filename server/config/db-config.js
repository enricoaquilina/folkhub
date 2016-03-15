var mongoose = require('mongoose');

module.exports = function(app, config){
  //connect to mongoose
  mongoose.connect(config.connString);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function cb(){
    console.log('folkhub db opened..');
  });

  app.listen(config.port, function(){
    console.log("App started on port " + config.port);
  });

  var userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String
  });

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, resultSet){
    if(resultSet.length === 0){
        User.create({
          userName: 'profmouse',
          email:'t@t.com',
          password: 'xyz',
          firstName: 'Enrico',
          lastName: 'Aquilina'
        });
        User.create({
          userName: 'profmouse',
          email:'x@x.com',
          password: 'xyz',
          firstName: 'Vladimir',
          lastName: 'Putin'
        });
        User.create({
          userName: 'profmouse',
          email:'t@t.com',
          password: 'xyz',
          firstName: 'Barack',
          lastName: 'Obama'
        });
    }
  });
}
