# React 18 中新的悬挂式 SSR 体系结构

New Suspense SSR Architecture in React 18

Server-side rendering (abbreviated to “SSR” in this post)

[借鉴文档 New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37)

## 启动

```js
pnpm start
// 访问 http://localhost:4000/
```

## 实现

服务端

```js
// 流式渲染html返回给客户端
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
      // 渲染代码报错会到这里
      didError = true;
      console.error("报错了", x);
    },
  }
);
// Abandon and switch to client rendering if enough time passes.
// Try lowering this to see the client recover.
setTimeout(() => stream.abort(), ABORT_DELAY);
```

## 步骤

1. 通过 scripts/build.js 执行 webpack 编译 src 目录下的代码 打包到 build 目录下
2. 执行 server/server.js 执行 express 启动服务端, 当我们访问对应的路由, 轮训查询 webpack 打包是否成功, 如果成功, 执行 server/render.js 的 render 方法
3. render 方法主要是执行 [renderToPipeableStream](https://react.docschina.org/reference/react-dom/server/renderToPipeableStream) 方法在服务端渲染前端组件并流式的返回给客户端, 在渲染初始 shell 之后立即启动的回调 onShellReady
4. 服务端渲染是可以把 SusPence 内的子组件的代码也渲染了(如果报错是不会渲染的)
5. 这个时候客服端拿到服务端返回的 html, 会执行入口文件, 也就是 src/index.js 的 [hydrateRoot](https://react.docschina.org/reference/react-dom/client/hydrateRoot#parameters) 方法, 也就是水合, 服务端之前渲染了页面, 页面的交互还是需要客服端执行 hydrateRoot, 将页面的交互进行初始化
6. 这个时候使使用了 lazy(() => import("./\*")) 的代码会在水合的时候动态加载 webpack 切割的的代码, 加载 SusPence 的 fallback 等待资源加载执行完渲染真实的页面
