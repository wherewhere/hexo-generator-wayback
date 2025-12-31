/* global hexo */
"use strict";
const { generator, deploy } = require("./lib/hexo");
/** @typedef {import("@types/hexo")} */
hexo.extend.filter.register("after_generate", () => generator(hexo), Number.MAX_VALUE);
hexo.extend.deployer.register("wayback_machine", () => deploy(hexo));