var mongoose = require('mongoose'),
    encrypt  = require('../common/crypto/encrypt');

var userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  firstname: {type: String},//required: 'The last name is required!'}
  lastname: {type: String},//required: 'The last name is required!'}
  salt: String,
  hashed_pwd: String,
  roles: [String]
});

userSchema.methods = {
  authenticate: function(inputtedPassword){
    return encrypt.hashPwd(this.salt, inputtedPassword) === this.hashed_pwd;
  },
  hasRole: function(role){
    return this.roles.indexOf(role) > -1;
  }
}
var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function(){
  User.find({}).exec(function(err, results){
  if(results.length === 0){
      var salt = encrypt.createSalt();
      var hash = encrypt.hashPwd(salt, 'hope');
      User.create({
        username: 'hope',
        email:'t@t.com',
        firstname: 'Enrico',
        lastname: 'Aquilina',
        salt: salt,
        hashed_pwd: hash,
        roles: ['admin']
      });

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'faith');
      User.create({
        username: 'faith',
        email:'x@x.com',
        firstname: 'Vladimir',
        lastname: 'Putin',
        salt: salt,
        hashed_pwd: hash,
        roles: []
      });

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'lol');
      User.create({
        username: 'lol',
        email:'t@t.com',
        firstname: 'Barack',
        lastname: 'Obama',
        salt: salt,
        hashed_pwd: hash
      });
  }
});
}
