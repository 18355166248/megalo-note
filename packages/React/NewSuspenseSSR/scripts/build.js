"use strict";

const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const chalk = require("chalk");

const isProduction = process.env.NODE_ENV === "production";

// 删除打包文件夹
rimraf.sync(path.resolve(__dirname, "../build"));

webpack(
  {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    entry: [path.resolve(__dirname, "../src/index.js")],
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log("Finished running webpack with errors.");
      info.errors.forEach((e) => console.error(e));
      process.exit(1);
    } else {
      console.log(chalk.greenBright("Finished running webpack."));
      console.log("");
    }
  }
);
