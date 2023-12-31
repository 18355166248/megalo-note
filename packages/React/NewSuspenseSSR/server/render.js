import * as React from "react";
// import {renderToString} from 'react-dom/server';
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import { DataProvider } from "../src/data";
import { API_DELAY, ABORT_DELAY } from "./delays";

// In a real setup, you'd read it from webpack build stats.
// 意思就是这里是模拟 真实的应该从webpack打包的目录中读取js css生成资源数据
let assets = {
  "main.js": "/main.js",
  "main.css": "/main.css",
};

module.exports = function render(url, res) {
  // This is how you would wire it up previously:
  //
  // res.send(
  //   '<!DOCTYPE html>' +
  //   renderToString(
  //     <DataProvider data={data}>
  //       <App assets={assets} />
  //     </DataProvider>,
  //   )
  // );

  // The new wiring is a bit more involved.
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;
  const data = createServerData();
  // renderToPipeableStream 不会影响 SusPence 组件内的正常渲染 除非数据是异步获取的
  const stream = renderToPipeableStream(
    <DataProvider data={data}>
      <App assets={assets} />
    </DataProvider>,
    {
      bootstrapScripts: [assets["main.js"]], // 打包的入口文件 异步加载
      onShellReady() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error("报错了", x);
      },
      onAllReady() {
        console.log("全部加载完成");
      },
    }
  );
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), ABORT_DELAY);
};

// Simulate a delay caused by data fetching.
// We fake this because the streaming HTML renderer
// is not yet integrated with real data fetching strategies.
// 系统给前端代码使用 用户模拟接口延时
function createServerData() {
  let done = false;
  let promise = null;
  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, API_DELAY);
      });
      // 这里 throw 直接报错 也就是为了在服务端渲染的时候 这个地方的组件不会正确渲染 会渲染
      // SusPence 的 fallback
      throw promise;
    },
  };
}
