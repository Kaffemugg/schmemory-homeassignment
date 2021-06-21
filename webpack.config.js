const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.DEV_SERVER_PORT || 3001;

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: ['./src/scripts/index.js'],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    watchContentBase: true,
    contentBase: './static',
    port,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
