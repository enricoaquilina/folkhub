var UserModel = require('mongoose').model('User'),
      encrypt = require('../common/crypto/encrypt');

exports.getUsers = function(req, res){
  UserModel.find({}).exec(function(err, collection){
    res.send(collection);
  });
}

exports.createUser = function(req, res, next){
  var newUser = req.body;
  newUser.email = req.body.email.toLowerCase();
  newUser.username = req.body.username.toLowerCase();

  var salt = encrypt.createSalt();
  var hashedPwd = encrypt.hashPwd(salt, newUser.password);
  newUser.salt = salt;
  newUser.hashed_pwd = hashedPwd;

  newUser.firstname = "";
  newUser.lastname = "";

  UserModel.create(newUser, function(err, newUser){
    if(err){
      if(err.toString().indexOf('E11000') > -1){
        err = new Error('There already is a user with the same username!');
      }
      res.status(400);
      res.send({reason: err.toString()});
    }
    req.logIn(newUser, function(err){
      if(err) {return next(err);}
      res.send(newUser);
    })
  })
}
