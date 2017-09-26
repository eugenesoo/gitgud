const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    main: path.resolve(__dirname, 'client/src/index.jsx'),
    signup: path.resolve(__dirname, 'client/src/signup.jsx'),
    user: path.resolve(__dirname, 'client/src/user.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'client/dist/js'),
    filename: '[name]-bundle.js'
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}

module.exports = config;