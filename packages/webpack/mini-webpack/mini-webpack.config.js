const path = require("path");

module.exports = {
  entry: "./src/module1.ts",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
  },
};
