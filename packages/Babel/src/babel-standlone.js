const Babel = require("@babel/standalone");
// const React = require("React");

let { code } = Babel.transform(
  `import React, { useState } from "react";
function useCustomIncrement(initialValue = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(count + 1);
  };

  return [count, increment];
}

// 在组件中使用
function App() {
  const [count, increment] = useCustomIncrement();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
export {App}
`,
  {
    presets: ["env", "react"],
  }
);
code = code.replace("exports.App =", "return");
console.log("🚀 ~ file: babel-standlone.js:34 ~ code:", code);
const res = new Function("require,exports ", code)(require, exports);
console.log("🚀 ~ file: babel-standlone.js:34 ~ customComponents:", res);

