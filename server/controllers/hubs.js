var HubModel = require('mongoose').model('Hub');

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
  HubModel.findOne({ hubname: req.body.hubname}).exec(function(err, hub){
    console.log('here');
    if(err) {return next(err);}
    res.send({success:true, hub:hub});
  })
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

exports.updateHub = function(req, res, next){
  var hubData = req.body;

  if(hubData._id != req.user._id && !req.user.hasRole('admin')){
    res.status(403);
    return res.end();
  }
  //
  // req.user.save(function(err){
  //   if(err){
  //     res.status(400);
  //
  //     return res.send({reason:err.toString()});
  //   }
  //   res.send(req.user);
  // });

  HubModel.findOneAndUpdate({_id: hubData._id}, hubData, function (err, hub) {
    if(err){
      res.status(400);
    }
    res.send(hub);
  });
}
