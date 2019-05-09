const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          { loader: "css-loader", options: {} }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)(\?.*)?$/,
        use: [
          { loader: "url-loader", options: { limit:8100,name:'./img/[hash:7].[name].[ext]'} }
        ]
      },
      // {
      //   test: /\.(png|jpg|svg|gif)/,
      //   use: [{loader:"file-loader",options:{name: '[name].[ext]'}}]
      // },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ["file-loader"] },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src']
          }
        }
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    hotOnly: true,
    open: true,
    proxy:{
      '/api':'http://127.0.0.1:3000'
    }
  }
};
