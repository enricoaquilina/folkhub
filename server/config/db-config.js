var mongoose = require('mongoose'),
    crypto = require('crypto');

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
    lastName: String,
    salt: String,
    hashed_pwd: String
  });

  userSchema.methods = {
    authenticate: function(inputtedPassword){
      return hashPwd(this.salt, inputtedPassword) === this.hashed_pwd;
    }
  }

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, resultSet){
    if(resultSet.length === 0){
        var salt = createSalt();
        var hash = hashPwd(salt, 'hope');
        User.create({
          userName: 'hope',
          email:'t@t.com',
          firstName: 'Enrico',
          lastName: 'Aquilina',
          salt: salt,
          hashed_pwd: hash
        });

        salt = createSalt();
        hash = hashPwd(salt, 'faith');
        User.create({
          userName: 'faith',
          email:'x@x.com',
          firstName: 'Vladimir',
          lastName: 'Putin',
          salt: salt,
          hashed_pwd: hash
        });

        salt = createSalt();
        hash = hashPwd(salt, 'lol');
        User.create({
          userName: 'lol',
          email:'t@t.com',
          firstName: 'Barack',
          lastName: 'Obama',
          salt: salt,
          hashed_pwd: hash
        });
    }
  });
}

function createSalt(){
  return crypto.randomBytes(128).toString('base64');
}
function hashPwd(salt, pwd){
  var hmac = crypto.createHmac('sha1', salt);
  hmac.setEncoding('hex');
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
}
