const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./public/src/js/index.js",
  module: {
    rules: [
      {
        test: /\.\/public\/src\/js\/\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/build/js"),
    filename: "main.js"
  }
};
