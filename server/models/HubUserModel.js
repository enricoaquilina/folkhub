var mongoose = require('mongoose');

var HubUserSchema = mongoose.Schema({
  hubname: {type:String},
  username: {type:String},
  userid: {type:String},
  datesubbed: {type:Date, default:Date.now}
});


var HubUser = mongoose.model('HubUser', HubUserSchema);
