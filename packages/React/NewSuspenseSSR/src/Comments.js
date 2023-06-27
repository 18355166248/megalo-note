/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useState } from "react";
import { useData, fakeData } from "./data";

export default function Comments() {
  // throw new Error();
  const comments = useData(); // 这里在服务端渲染的时候会报错 报错的话会默认执行外层的 SusPense 的 fallback 进行渲染

  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setComments(fakeData);
  //   }, 1000);
  // }, []);

  return (
    <>
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
    </>
  );
}
