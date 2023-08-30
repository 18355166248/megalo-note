const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");

babel.transformFile(
  "packages/Babel/src/Demo/3.jsx",
  {
    presets: [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          // development: process.env.BABEL_ENV === "development",
          development: true, // 会在组件上添加 __self 和 __source
        },
      ],
    ],
  },
  (err, res) => {
    if (err) {
      console.log("🚀 ~ file: babel-react.js:9 ~ err:", err);
      return;
    }

    // 打包
    const dirPath = path.resolve(__dirname, "../dist-babel-react");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const filePath = path.resolve(dirPath, "index.js");
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    const writer = fs.createWriteStream(filePath);
    writer.write(res.code, (err) => {
      if (err) {
        console.log("🚀 ~ file: babel-react.js:19 ~ writer.write ~ err:", err);
        return;
      }
      console.log("babel-react 打包成功");
    });
  }
);
