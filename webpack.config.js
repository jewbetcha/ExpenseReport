const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = {
  context: path.resolve(__dirname),
  entry: './public/main.js',
  output: {
    path: path.resolve(__dirname),
    filename: './public/bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'public'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    }]
  },
  plugins: [
    new DashboardPlugin()
  ]
}

module.exports = config;