const path = require('path');
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.jsx',
    content: './src/content.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    contentBase: '/dist/',
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: [
          path.resolve(__dirname, './src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      template: './src/index.html',
    }),
    // copy extension manifest and icons
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { context: './src/assets', from: 'icon-**', to: 'assets' },
    ]),
  ],
};
