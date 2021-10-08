const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

const pugFiles = glob.sync(__dirname + "/src/*.pug");
const htmlFilesArr = pugFiles.map((file) => {
  console.log(file.split("/").reverse()[0]);
  return new htmlWebpackPlugin({
    template: file,
    filename: file.split("/").reverse()[0].replace(/\.pug/, ".[hash].html"),
  });
});
htmlFilesArr.push(new CleanWebpackPlugin());

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
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
    ],
  },
  plugins: htmlFilesArr,
};
