"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _of = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/of"));
var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));
var _flat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/flat"));
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _ = require("./2");
var _context, _context2;
var a = [1, 2, 3];
var obj = {
  key1: "key1"
};

// 默认 @babel/preset-env 支持
console.log("obj?.key1", obj === null || obj === void 0 ? void 0 : obj.key1);
console.log("obj?.key2", obj === null || obj === void 0 ? void 0 : obj.key2);
console.log("String.includes", (0, _includes["default"])(_context = "foobar").call(_context, "foo"));

// first file:
var set = new _set["default"]([1, 2, 3]);

// second file:
var array = (0, _of["default"])(1, 2, 3);
(0, _from["default"])(new _set["default"]([1, 2, 3, 2, 1]));
(0, _flat["default"])(_context2 = [1, [2, 3], [4, [5]]]).call(_context2, 2);
_promise["default"].resolve(32).then(function (x) {
  return console.log(x);
});
(0, _map["default"])(a).call(a, function (v) {
  console.log(v);
});
(0, _.module2)();