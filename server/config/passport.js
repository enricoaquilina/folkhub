var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function(){
  var UserModel = mongoose.model('User');

  passport.use(new LocalStrategy(
    function(username, password, done){
      UserModel.findOne({
         $or: [ { username : username }, { email: username } ]
       }).exec(function(err, user){
        if(user && user.authenticate(password)){
            //dont send unnecessary info to client
            var User = {
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              username: user.username,
              roles: user.roles
            }
            return done(null, User);
        }else{
          return done(null, false);
        }
      })
    }
  ));
  //this is according to passport documentation
  passport.serializeUser(function(user, done) {
    if(user){
      done(null, user._id);
    }
  });
  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user){
      if(user){
        done(err, user);
      }else{
        done(err, false);
      }
    });
    // UserModel.findOne({_id:id}).exec(function(err, user){
    //   if(user){
    //     return done(null, user);
    //   }else{
    //     return done(null, false);
    //   }
    // })

  });
}
