//the path is the same regardless of which environment the app is in
//we require the path module to normalize the path
var path = require('path'),
    mongoose = require('mongoose');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    rootPath: rootPath,
    connString: "mongodb://localhost/folkhub",
    port: process.env.PORT || 5000,
    rtg: ''
  },
  production: {
    rootPath: rootPath,
    connString: "mongodb://profmouse:folkhub@ds011449.mlab.com:11449/folkhub",
    port: process.env.PORT || 5000
  }
}
