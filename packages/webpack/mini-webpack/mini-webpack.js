const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

let ID = 1;

const config = require("./mini-webpack.config");

function init() {
  // 收集入口依赖
  const dependent = collectDependencies(config.entry);
  // 基于入口依赖递归地构建一个依赖关系图
  const dependencyGraph = createDependGraph(dependent);
  // 基于依赖关系图打包成一个 bundle
  const code = bundle(dependencyGraph);

  const outPath = config.output;
  // 判断文件夹不存在 就创建文件夹
  if (!fs.existsSync(outPath.path)) {
    fs.mkdirSync(outPath.path);
  }
  const outFilePath = path.join(outPath.path, outPath.filename);

  // 判断文件是否存在 如果存在 删除文件
  if (fs.existsSync(outFilePath)) {
    fs.unlinkSync(outFilePath);
  }

  // 写入文件
  let writer = fs.createWriteStream(outFilePath);

  writer.write(code, (err) => {
    if (err) console.log("打包失败");
    else console.log("打包成功");
  });
}

function collectDependencies(filename) {
  let absPath = path.resolve(__dirname, filename);

  if (absPath.lastIndexOf(".ts") === -1) {
    absPath += ".ts";
  }
  const entryContent = fs.readFileSync(absPath, "utf-8");

  const dependencies = [];

  // 转成 ast 获取 import 依赖
  const ast = parse(entryContent, {
    sourceType: "module",
    plugins: ["typescript"],
  });
  traverse(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value);
    },
  });
  // 将 ast 转成代码
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    filename: "*.ts",
  });

  const id = ID++;

  return {
    id,
    filename,
    dependencies,
    code,
  };
}

// 归地构建一个依赖关系图
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

function bundle(graph) {
  let modules = "";
  graph.forEach((module) => {
    modules += `
      ${module.id}: [
        function(require, module, exports) {
          ${module.code}
        },
        ${JSON.stringify(module.mapping)}
      ],
    `;
  });

  let res = `
  (function(modules){
    function require(id) {
      // fn: 执行模块代码, 给 exports 赋值
      // mapping:
      let [fn, mapping] = modules[id];

      function localRequire(relativePath) {
        return require(mapping[relativePath])
      }
      let module = {exports: {}};
      fn(localRequire, module, module.exports);
      return module.exports;
    }
    // 对应的初始值ID
    return require(1)
  })({${modules}})`;

  return res;
}

init();
