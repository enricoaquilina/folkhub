var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var messageSchema = mongoose.Schema({
  content: {type:String},
  userid: {type:String, unique:true},
  parenthubid  : { type: Schema.Types.ObjectId, ref: 'Hub' }
});

messageSchema.methods = {
  search: function(hubName){

  }
}
var Message = mongoose.model('Message', messageSchema);
