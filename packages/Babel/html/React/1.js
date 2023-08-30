import React, { useState } from "react";
import { renderToString } from "react-dom/server";

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

const html = renderToString(<App />);

console.log("🚀 ~ file: 3.jsx:27 ~ html:", html);
