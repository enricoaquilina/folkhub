var express = require('express'),
    stylus = require('stylus');
    logger = require('morgan');
    bodyParser = require('body-parser');

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
app.use(logger('dev'));
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

/*add a route which delivers the index page for all routes
asterisk will match all routes which are not previously defined
(kinda like the default in a switch statement)

server side just serves index..on the client it handles the routing
*/
app.get('*', function(req, res){
  res.render('index');
})


var port = 5000;
app.listen(port, function(){
  console.log("App started on port "+port);
});
