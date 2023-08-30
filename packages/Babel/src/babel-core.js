const babel = require("@babel/core");
const { parse } = require("@babel/parser");

const code = `import { module2 } from "./2";

const a = [1, 2, 3];

a.map((v) => {
  console.log(v);
});

module2();
`;

babel.transform(
  code,
  {
    presets: ["@babel/preset-env"],
  },
  function (err, result) {
    // result; // => { code, map, ast }
    console.log("🚀 ~ file: babel-core.js:17 ~ result:", result);
  }
);

// 两个 parse 功能是一样的
const babelParserAst = parse(code, {
  sourceType: "module",
});

babel.parse(code, {}, (err, result) => {
  console.log("🚀 ~ file: babel-core.js:33 ~ result:", result);
  console.log(JSON.stringify(result) === JSON.stringify(babelParserAst)); // true
});
