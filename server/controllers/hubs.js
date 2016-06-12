var HubModel = require('mongoose').model('Hub'),
    HubUserModel = require('mongoose').model('HubUser'),
    uuid = require('node-uuid');

exports.getHubs = function(req, res, next){
  HubModel.find({}).exec(function(err, collection){
    res.send(collection);
  });
}

exports.getUserHubs = function(req, res, next){
  HubModel.find({creator: req.params.username}).exec(function(err, collection){
    res.send(collection);
  })
}

exports.getHubDetails = function(req, res, next){
  var hubData = req.body;
  HubModel.findOne({ hubname: hubData.hubname}).exec(function(err, hub){
    if(err) {return next(err);}
    var found = false;

    if(hub){
      found = true;
    }

    res.send({success:found, hub:hub});
  });
}

exports.createHub = function(req, res, next){
  var newHub = req.body;
  HubModel.create(newHub, function(err, newHub){
    if(err) {
      if(err.toString().indexOf('E11000') > -1){
        err = new Error('There already is a hub with the same name');
      }
      res.status(400);
      res.send({reason:err.toString()});
    }
    res.send(newHub);
  })
}
exports.createHubUser = function(req, res, next){
  var hubuser = req.body;
  hubuser.username = req.user.username;
  hubuser.userid = uuid.v1();

  HubUserModel.create(hubuser, function(err, hubuser){
    if(err) {
      res.status(400);
      res.send({reason:err.toString()});
    }
    res.send(hubuser);
  })
}
exports.subscribetoHubs = function(req, res, next){
  var hubs = JSON.parse(req.body);
  var username = req.user.username;
  var userid = uuid.v1();

  for (var i = 0; i < hubs.length; i++) {

    var obj = {
      hubname: hubs[i],
      username: username,
      userid: userid
    }

    HubUserModel.create(obj, function(err, hubUser){
      if(err) {
        res.status(400);
        res.send({reason:err.toString()});
      }
    })
  }
}
exports.getHubUserByUsername = function(username){
  HubUserModel.findOne({ username: username}).limit(1).exec(function(err, hubuser){
    if(err) {return next(err);}
    var found = false;
    if(hubuser){
      return hubuser;
    }
  });
}
exports.deleteHub = function(req, res, next){
  var hubData = req.body;

  HubModel.findOne({ _id: req.params.id }, function (err, hub) {
    if (err) {
      res.status(400);
      return res.end();
    }
    if(hub.creator != req.user.username && !req.user.hasRole('admin')){
      res.status(403);
      return res.end();
    }

    hub.remove(function (err) {
      if(err){
        res.status(400);
        return res.end();
      }
      res.send(true);
    });
  });
}

exports.updateHub = function(req, res, next){
  var hubData = req.body;

  if(hubData.creator != req.user.username &&
     !req.user.hasRole('admin')){
    res.status(403);
    return res.end();
  }

  HubModel.findOneAndUpdate({_id: hubData._id}, hubData, function (err, hub) {
    if(err){
      if(err.toString().indexOf('E11000') > -1){
        err = new Error('There already is a hub with the same name!');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(hub);
  });
}
