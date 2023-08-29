const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

let ID = 1;

const config = require("./mini-webpack.config");

function init() {
  const dependencies = collectDependencies(config.entry);
  const allAsset = createDependGraph(dependencies);
  console.log("🚀 ~ file: mini-webpack.js:13 ~ init ~ allAsset:", allAsset);
}

function collectDependencies(filename) {
  let absPath = path.resolve(__dirname, filename);

  if (absPath.lastIndexOf(".ts") === -1) {
    absPath += ".ts";
  }
  const entryContent = fs.readFileSync(absPath, "utf-8");

  const dependencies = [];

  const ast = parse(entryContent, {
    sourceType: "module",
    plugins: ["typescript"],
  });

  traverse(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value);
    },
  });

  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"],
  });
  console.log(
    "🚀 ~ file: mini-webpack.js:41 ~ collectDependencies ~ code:",
    code
  );

  const id = ID++;

  return {
    id,
    filename,
    dependencies,
  };
}

function createDependGraph(mainAsset) {
  const allAsset = [mainAsset];

  let i = 0;

  while (allAsset.length > i) {
    let asset = allAsset[i];
    // 获取模块的 dirname 路径 这里就是 ./src
    const dirname = path.dirname(asset.filename);
    asset.mapping = {};
    asset.dependencies.forEach((relativePath) => {
      const absPath = path.join(dirname, relativePath);
      let childAsset = collectDependencies(absPath);
      asset.mapping[relativePath] = childAsset.id;
      allAsset.push(childAsset);
    });

    i++;
  }

  return allAsset;
}

init();
