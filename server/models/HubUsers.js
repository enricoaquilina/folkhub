var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HubUser = mongoose.Schema({
  hubname: {type:String, unique: true},
  hubuser: {type:String},
  datesubbed: {type:Date, default:Date.now}
});
