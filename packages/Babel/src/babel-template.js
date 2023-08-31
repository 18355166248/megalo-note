const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const source = "my-module";

const fn = template`
  var IMPORT_NAME = require('${source}');
`;

const ast = fn({
  IMPORT_NAME: t.identifier("myModule"),
});

console.log(generate(ast).code); // var myModule = require("my-module");
