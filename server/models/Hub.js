var mongoose = require('mongoose'),
    Message  = require('./Message');

var Hub = mongoose.Schema({
  hubname: {type:String, unique: true},
  description: {type:String, unique:true},
  picture: {type: String},
  helpers: [String]
});

Hub.methods = {
  search: function(hubName){

  }
}
var Hub = mongoose.model('Hub', Hub);

exports.createDefaultHubs = function() {
  Hub.find({}).exec(function(err, results){
    if(results.length === 0){
      var sciencehub = new Hub({hubname: 'science',
      description: 'news updates and general discussions on science',
      helpers: ['science', 'news', 'coolness']});

      sciencehub.save(function(err){
        if(err){throw(err);}
        console.log(sciencehub._id);
      });
      var Message = mongoose.model('Message');

      Message.create({
        content: 'my first hub message',
        userid: 'lol',
        parenthubid: sciencehub._id
      })

      var moviehub = new Hub({
        hubname: 'movies',
        description: 'movie updates and general discussions on science',
        helpers: ['movies', 'news', 'entertainment']
      })

      moviehub.save(function(err){
        console.log(moviehub._id);
      });

      var fitnesshub = new Hub({
        hubname: 'fitness',
        description: 'fitness updates and general discussions on science',
        helpers: ['fitness', 'beauty', 'health']
      })

      fitnesshub.save(function(err){
        console.log(fitnesshub._id);
      })
    }
  });
}
