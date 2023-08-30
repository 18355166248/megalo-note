const obj = {
  a: 1,
  b: 2,
  c: 3,
};

type keys = keyof typeof obj;

const config: Partial<Record<keys, string | number>> = {};

config.a = 1234;
config.b = "测试数据";
