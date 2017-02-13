const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
// const extractCommons = new webpack.optimize.CommonsChunkPlugin({
//   name: 'commons',
//   filename: 'commons.js'
// })

const config = {
  context: path.resolve(__dirname),
  entry: {
      main: './public/main.js',
      charts: './public/charts.js',
      expenses: './public/expenses.js'
  },
  output: {
    path: path.resolve(__dirname),
    filename: './public/dist/[name].bundle.js'
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
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
          {
            loader: 'postcss-loader?sourceMap=false',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg)$/,
      use: [{
        loader: 'url-loader',
        options: { limit: 10000 } // Convert images < 10k to base64 strings
      }]
    }]
  },
  plugins: [
    new DashboardPlugin()
    //extractCommons
  ]
}

module.exports = config;