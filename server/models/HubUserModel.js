var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hubUserSchema = mongoose.Schema({
  hubname: {type:String, unique: true},
  userid: {type:String},
  userconnection: {type:Object}
  datesubbed: {type:Date, default:Date.now}
});

var HubUserModel = mongoose.model('HubUserModel', hubUserSchema);
