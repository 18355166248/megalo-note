import { module2 } from "./2";

const a = [1, 2, 3];
const obj = { key1: "key1" };

// 默认 @babel/preset-env 支持
console.log("obj?.key1", obj?.key1);
console.log("obj?.key2", obj?.key2);

console.log("String.includes", "foobar".includes("foo"));

// first file:
var set = new Set([1, 2, 3]);

// second file:
var array = Array.of(1, 2, 3);

Array.from(new Set([1, 2, 3, 2, 1]));
[1, [2, 3], [4, [5]]].flat(2);
Promise.resolve(32).then((x) => console.log(x));

a.map((v) => {
  console.log(v);
});

module2();
