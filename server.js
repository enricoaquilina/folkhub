var express = require('express'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/db-config')(app, config);

var UserModel = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done){
    console.log(username+' '+password);
    UserModel.findOne({userName: username}).exec(function(err, user){
      if(user){
        return done(null, user);
      }else{
        return done(null, false);
      }
    })
  }
));

passport.serializeUser(function(user, done){
  if(user){
    done(null, user._id);
  }
});

passport.deserializeUser(function(id, done){
  UserModel.findOne({_id: id}).exec(function(err, user){
    if(user){
      return done(null, user);
    }else{
      return done(null, false);
    }
  })
});

require('./server/routes/routes')(app);

/*add a route which delivers the index page for all routes
asterisk will match all routes which are not previously defined
(kinda like the default in a switch statement)
*/
