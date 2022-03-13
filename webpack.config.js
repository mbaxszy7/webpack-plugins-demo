const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CpoyPlugin = require("./copy-plugin");
const FileList = require("./file-list");

module.exports = {
  target: ["web", "es6"],
  entry: path.join(__dirname, "./index.js"),
  output: {
    filename: "[name].js",
    path: __dirname + "/out",
  },
  devtool: "nosources-source-map",
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[hash:6].[ext]",
              publicPath: "/images",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "copy-demo",
      template: path.resolve(__dirname, "./index.html"),
    }),
    new CpoyPlugin({
      from: "./out",
    }),
    new FileList(),
  ],
};
