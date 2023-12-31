/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

"use strict";

const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: [["react-app", { runtime: "automatic" }]],
  plugins: ["@babel/transform-modules-commonjs"],
});

const express = require("express");
const compress = require("compression");
const { existsSync } = require("fs");
const path = require("path");
const render = require("./render");
const chalk = require("chalk");
const { JS_BUNDLE_DELAY } = require("./delays");

const PORT = process.env.PORT || 4000;
const app = express();

app.use((req, res, next) => {
  if (req.url.endsWith(".js")) {
    // Artificially delay serving JS
    // to demonstrate streaming HTML.
    // 延迟js节课响应
    setTimeout(next, JS_BUNDLE_DELAY);
  } else {
    next();
  }
});

app.use(compress()); // 开启压缩
app.get(
  "/",
  handleErrors(async function (req, res) {
    // 轮训判断webpack的打包结果已经存在
    await waitForWebpack();
    render(req.url, res);
  })
);
app.use(express.static("build")); // 静态资源
app.use(express.static("public")); // 静态资源

app
  .listen(PORT, () => {
    console.log("");
    console.log(`Listening at ${chalk.blueBright(`http://localhost:${PORT}`)}`);
    console.log("");
  })
  .on("error", function (error) {
    if (error.syscall !== "listen") {
      throw error;
    }
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? "Pipe " + PORT : "Port " + PORT;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}

async function waitForWebpack() {
  while (true) {
    try {
      existsSync(path.resolve(__dirname, "../build/main.js"));
      return;
    } catch (err) {
      console.log(
        "Could not find webpack build output. Will retry in a second..."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
