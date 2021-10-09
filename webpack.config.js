const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

const pugFiles = glob.sync(__dirname + "/src/*.pug");
const htmlFilesArr = pugFiles.map((file) => {
  console.log(file.split("/").reverse()[0]);
  return new htmlWebpackPlugin({
    template: file,
    filename: file.split("/").reverse()[0].replace(/\.pug/, ".html"),
  });
});
htmlFilesArr.push(new CleanWebpackPlugin());

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    index: "./index.js",
    styles_import: "./imports/styles.imports.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "dist",
    hot: false,
  },
  watchOptions: {
    poll: true,
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
    ],
  },
  plugins: htmlFilesArr,
};
