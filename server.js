
var webpack = require("webpack")
  , express = require('express');

var webpackConfig = require('./webpack.config.js');

var compiler = webpack(webpackConfig)
  , app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  contentBase: '/public',
  publicPath: webpackConfig.output.publicPath,
  stats: { 
    colors: true, 
    cached: false 
  }
}));

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(__dirname + '/public'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(__dirname + '/public/index.html')
});

var server = app.listen(3001, function () {
  var host = server.address().address
    , port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
