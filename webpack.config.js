const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      main: path.resolve(__dirname, "/src"),
      object: path.resolve(__dirname, "/src/object"),
      handler: path.resolve(__dirname, "/src/handler"),
      enum: path.resolve(__dirname, "/src/enum"),
      utils: path.resolve(__dirname, "/src/utils"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
