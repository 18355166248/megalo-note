"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _server = require("react-dom/server");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useCustomIncrement() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var _useState = (0, _react.useState)(initialValue),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    count = _useState2[0],
    setCount = _useState2[1];
  var increment = function increment() {
    setCount(count + 1);
  };
  return [count, increment];
}

// 在组件中使用
function App() {
  var _useCustomIncrement = useCustomIncrement(),
    _useCustomIncrement2 = (0, _slicedToArray2["default"])(_useCustomIncrement, 2),
    count = _useCustomIncrement2[0],
    increment = _useCustomIncrement2[1];
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", null, "Count: ", count), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: increment
  }, "Increment"));
}
var html = (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(App, null));
console.log("🚀 ~ file: 3.jsx:27 ~ html:", html);
var _default = html;
exports["default"] = _default;