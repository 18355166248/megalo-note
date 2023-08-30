const { parse } = require("@babel/parser");
const generate = require("@babel/generator").default;

const a = "var a = 1;";
const b = "var b = 2;";
const astA = parse(a, { sourceFilename: "a.js" });
const astB = parse(b, { sourceFilename: "b.js" });
const ast = {
  type: "Program",
  body: [].concat(astA.program.body, astB.program.body),
};

const { code, map } = generate(
  ast,
  { sourceMaps: true },
  {
    "a.js": a,
    "b.js": b,
  }
);

console.log("🚀 ~ file: babel-generator.js:17 ~ map:", map);
console.log("🚀 ~ file: babel-generator.js:17 ~ code:", code);
