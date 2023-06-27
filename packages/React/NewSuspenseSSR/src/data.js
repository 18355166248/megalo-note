/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext, useContext } from "react";

// Note: this file does not demonstrate a real data fetching strategy.
// We only use this to simulate data fetching happening on the server
// while the cache is populated on the client. In a real app, you would
// instead use a data fetching library or Server Components for this.

const DataContext = createContext(null);

export function DataProvider({ children, data }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

// In a real implementation the data would be streamed with the HTML.
// We haven't integrated this part yet, so we'll just use fake data.
export const fakeData = [
  "Wait, it doesn't wait for React to load?",
  "How does this even work?",
  "I like marshmallows",
];

// 模拟接口延时
export function useData() {
  const ctx = useContext(DataContext);
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
