
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
  })({
      1: [
        function(require, module, exports) {
          "use strict";

var _module = _interopRequireDefault(require("./module2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// module-1.js

console.log("mini-webpack: ".concat(_module["default"]));
        },
        {"./module2":2}
      ],
    
      2: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _module = _interopRequireDefault(require("./module3"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// module-2.js

var res = "module2 import ".concat(_module["default"], " from module-3.js");
var _default = res;
exports["default"] = _default;
        },
        {"./module3":3}
      ],
    
      3: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// module-3.js
var _default = "hello world";
exports["default"] = _default;
        },
        {}
      ],
    })