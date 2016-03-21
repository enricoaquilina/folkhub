var auth = require('./auth'),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('User');

module.exports = function(app){
  //this will look in the public/app directory and process the files as jade templates

  app.get('/api/users', auth.apiLogin, function(req, res){
    UserModel.find({}).exec(function(err, collection){
      res.send(collection);
    })
  });
  app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params[0]);
  });
  app.post('/login', auth.authenticate);
  app.post('/logout', function(req, res){
    //this was added by the passport module
    req.logout();
    res.end();
  });
  app.get('*', function(req, res){
    res.render('index',{
      bootstrappedUser: req.user
    });
  });
}
