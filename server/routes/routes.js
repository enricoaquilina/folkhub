var passport = require('passport');

module.exports = function(app){
  //this will look in the public/app directory and process the files as jade templates
  app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params[0]);
  });
  app.post('/login', function(req, res, next){
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
  });
  app.get('*', function(req, res){
    res.render('index');
  })
}
