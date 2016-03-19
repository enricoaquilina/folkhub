var express = require('express'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

var db = require('./server/config/db-config')(app, config);

var UserModel = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done){
    UserModel.findOne({userName: username}).exec(function(err, user){
      if(user && user.authenticate(password)){
          //dont send unnecessary info to client
          var User = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
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
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

require('./server/config/routes')(app);

/*add a route which delivers the index page for all routes
asterisk will match all routes which are not previously defined
(kinda like the default in a switch statement)
*/
