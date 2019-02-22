const path = require('path')

module.exports = {
  entry: {
    app: './app/js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ]
  }
};
