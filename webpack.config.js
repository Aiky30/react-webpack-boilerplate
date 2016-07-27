/* eslint es6: false */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//TODO: https://www.npmjs.com/package/extract-text-webpack-plugin
//TODO: new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

var commonLoaders = [
  { 
    test: /.json$/, 
    loaders: [ 'json' ] 
  },
  {   // TODO: needs a pre processor, it needs to compile and then use css loader.
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader?-url")
  }, /*
  { 
    test: /.css$/, 
    loaders: ['style', 'css'] 
  }, */
  { 
    test: /\.(png|jpg|jpeg|gif)$/, 
    loader: "file" 
  }
];

const babelPresets=['es2015', 'react'];

var defaultConfig = {
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/app'
  ],
  output: {
    path: __dirname + '/',
    filename: 'my-javascript.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("my-stylesheet.css", {
        allChunks: true
    })
  ],
  module: {
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: babelPresets,
          plugins: [
            [
              'react-transform', 
              {
                'transforms': [
                  {
                    'transform': 'react-transform-hmr',
                    'imports': ['react'],
                    'locals': ['module']
                  },
                  {
                    'transform': 'react-transform-catch-errors',
                    'imports': ['react', 'redbox-react']
                  }
                ]
              }
            ]
          ]
        } 
      }
    ].concat(commonLoaders)
  }
};

var prodConfig = {
  entry: [
    'babel-polyfill',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'my-javascript.js'
  },
  plugins: [
    //new webpack.optimize.OccurenceOrderPlugin(), // For chunks, not sure it's necessary when you don't use chunks
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]) ], // Ignore moments languages
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin("my-stylesheet.css", {
        allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          presets: babelPresets,
        }
      }
    ].concat(commonLoaders)
  }
};

var configSet;

if(process.env.NODE_ENV === 'production') {
  configSet = prodConfig
}
else {
  configSet = defaultConfig
}

module.exports = configSet;
