const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devServer: {
      contentBase: './dist',
      hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]

      }
    ]
  },
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'

};