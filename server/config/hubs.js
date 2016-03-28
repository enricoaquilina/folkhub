var HubModel = require('mongoose').model('Hub');

exports.getHubs = function(req, res, next){
  HubModel.find({}).exec(function(err, collection){
    res.send(collection);
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
