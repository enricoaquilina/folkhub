var mongoose = require('mongoose');

var HubUserSchema = mongoose.Schema({
  hubname: {type:String},
  username: {type:String},
  userid: {type:String},
  datesubbed: {type:Date, default:Date.now}
});
HubUserSchema.index({hubname: 1, username: 1, userid: 1},
  {unique: true});

var HubUser = mongoose.model('HubUser', HubUserSchema);
