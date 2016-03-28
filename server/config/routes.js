var auth = require('./auth'),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('User'),
    users = require('./users'),
    hubs = require('./hubs');

module.exports = function(app){
  //this will look in the public/app directory and process the files as jade templates

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);

  app.get('/api/hubs', auth.requiresRole('admin'), hubs.getHubs);
  app.post('/api/hubs', hubs.createHub);

  app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params[0]);
  });
  app.post('/register', auth.signUp);
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
