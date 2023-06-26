/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// Tweak these to play with different kinds of latency.

// How long the data fetches on the server.
// 接口延时
exports.API_DELAY = 2000;

// How long the server waits for data before giving up.
// 服务器在放弃之前等待数据的时间
exports.ABORT_DELAY = 10000;

// How long serving the JS bundles is delayed.
// 加载js等待时长
exports.JS_BUNDLE_DELAY = 4000;