var passport = require('passport');

exports.authenticate = function(req, res, next){
  var auth = passport.authenticate('local', function(err, user){
    //this uses the method defined in server.js for LocalStrategy
    if(err) { return next(err); }
    if(!user) { res.send({success:false})}

    //tell passport to login users and create a session
    //normally you dont tell passport to login the user, but sincce we're using xhr we have to
    //do it like this
    req.logIn(user, function(err){
      if(err) {return next(err);}
      res.send({success:true, user:user});
    })
  })
  auth(req, res, next);
};

exports.apiLogin = function(req, res, next){
  if(!req.isAuthenticated()){
    res.status(403);
    res.end();
  }else{
    next();
  }
}
