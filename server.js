var express = require('express'),
    stylus = require('stylus');
    logger = require('morgan');
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

//compile function for stylus which gets used by the middleware
function compile(str, path){
  return stylus(str).set('filename', path);
}

//set the views property to the path where im gonna hold my views
//since it's gonna be a SPA views have been put in server folder
app.set("views", __dirname + '/server/views');
app.set('view engine', 'jade');
//app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//configure stylus middleware itself
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));
//this is saying that when a request comes in requesting the public directory
//go ahead and serve the file.
app.use(express.static(__dirname + '/public'));

//connect to mongoose
if(env === 'development'){
  mongoose.connect('mongodb://localhost/folkhub');
}else{
  mongoose.connect('mongodb://profmouse:folkhub@ds011449.mlab.com:11449/folkhub');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function cb(){
  console.log('folkhub db opened..');
});

/*add a route which delivers the index page for all routes
asterisk will match all routes which are not previously defined
(kinda like the default in a switch statement)
*/
//this will look in the public/app directory and process the files as jade templates
app.get('/partials/*', function(req, res){
  res.render('../../public/app/'+req.params[0]);

});
app.get('*', function(req, res){
  res.render('index');
})


var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log("App started on port "+port);
});
