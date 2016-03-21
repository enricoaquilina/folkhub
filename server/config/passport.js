var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function(){
  var UserModel = mongoose.model('User');

  passport.use(new LocalStrategy(
    function(username, password, done){
      UserModel.findOne({
         $or: [ { userName : username }, { email: username } ]
       }).exec(function(err, user){
        if(user && user.authenticate(password)){
            //dont send unnecessary info to client
            var User = {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              userName: user.userName,
              roles: user.roles
            }
            return done(null, User);
        }else{
          return done(null, false);
        }
      })
    }
  ));
  //joe eames uses code which is slightly different for serial/deserial just fyi.
  passport.serializeUser(function(user, done) {
    if(user){
      done(null, user);
    }
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
    // UserModel.findOne({_id:userId}).exec(function(err, user){
    //   if(user){
    //     return done(null, user);
    //   }else{
    //     return done(null, false);
    //   }
    // })
  });
}
