const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");
// const webpack = require("webpack");

// Плагины
// const pugFiles = glob.sync(__dirname + "/src/*.pug"); // получаю все файлы с расширением pug
// const plugins = pugFiles.map(
//   (file) =>
//     new htmlWebpackPlugin({
//       template: file,
//       filename: file.split("/").reverse()[0].replace(/\.pug/, ".html"),
//     })
// );

const plugins = [
  new htmlWebpackPlugin({
    filename: "index.html",
    template: path.resolve(__dirname, "src", "index.pug"),
    chunks: ["index"],
  }),
  new htmlWebpackPlugin({
    filename: "pages/ui-kit.html",
    template: path.resolve(__dirname, "src/pages", "ui-kit", "ui-kit.pug"),
    chunks: ["pages_styles", "ui_kit"],
  }),
  new htmlWebpackPlugin({
    filename: "pages/landing.html",
    template: path.resolve(__dirname, "src/pages", "landing", "landing.pug"),
    chunks: ["pages_styles", "landing"],
  }),
];
plugins.push(new CleanWebpackPlugin());

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    index: "./index.js",
    pages_styles: "./pages/pages.js",
    ui_kit: "./pages/ui-kit/ui-kit.js",
    landing: "./pages/landing/landing.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "dist",
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "assets/[name].[ext]",
        },
      },
    ],
  },
  plugins: plugins,
};
