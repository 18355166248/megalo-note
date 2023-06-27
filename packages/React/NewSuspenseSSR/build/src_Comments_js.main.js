"use strict";
(self["webpackChunknew_suspense_ssr"] = self["webpackChunknew_suspense_ssr"] || []).push([["src_Comments_js"],{

/***/ "./src/Comments.js":
/*!*************************!*\
  !*** ./src/Comments.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Comments)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/xmly/Study/code/megalo-note/packages/React/NewSuspenseSSR/src/Comments.js";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */





function Comments() {
  var _this = this;
  // throw new Error();
  var comments = (0,_data__WEBPACK_IMPORTED_MODULE_1__.useData)(); // 这里在服务端渲染的时候会报错 报错的话会默认执行外层的 SusPense 的 fallback 进行渲染

  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setComments(fakeData);
  //   }, 1000);
  // }, []);

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: comments.map(function (comment, i) {
      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("p", {
        className: "comment",
        children: comment
      }, i, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 9
      }, _this);
    })
  }, void 0, false);
}

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataProvider: () => (/* binding */ DataProvider),
/* harmony export */   fakeData: () => (/* binding */ fakeData),
/* harmony export */   useData: () => (/* binding */ useData)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/xmly/Study/code/megalo-note/packages/React/NewSuspenseSSR/src/data.js";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



// Note: this file does not demonstrate a real data fetching strategy.
// We only use this to simulate data fetching happening on the server
// while the cache is populated on the client. In a real app, you would
// instead use a data fetching library or Server Components for this.

var DataContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
function DataProvider(_ref) {
  var children = _ref.children,
    data = _ref.data;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(DataContext.Provider, {
    value: data,
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 10
  }, this);
}

// In a real implementation the data would be streamed with the HTML.
// We haven't integrated this part yet, so we'll just use fake data.
var fakeData = ["Wait, it doesn't wait for React to load?", "How does this even work?", "I like marshmallows"];

// 模拟接口延时
function useData() {
  var ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DataContext);
  console.log("ctx", ctx);
  // ctx 在服务端渲染的时候  ctx.read 是一个异步函数 且会直接报错 也就是不会往下执行返回数据
  // ctx 在客户端渲染的时候  ctx 是 null 也就不会报错 直接返回正确的数据了
  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    // 它在这里模拟挂起的数据提取 (其实就是报错 不往下执行了)
    ctx.read();
  }
  return fakeData;
}

/***/ })

}]);
//# sourceMappingURL=src_Comments_js.main.js.map