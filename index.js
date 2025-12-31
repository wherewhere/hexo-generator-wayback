#!/usr/bin/env node
/* global hexo */
"use strict";
if (typeof hexo === "undefined") {
    const url = process.argv[2];
    if (!url) {
        console.error("No URL provided.");
        return;
    }
    const fetch = require("fetchline");
    const urls = fetch(url);
    console.log("Fetching urls from", url);
    require("./lib/wayback")(urls);
}
else {
    const { generator, deploy } = require("./lib/hexo");
    /** @typedef {import("@types/hexo")} */
    hexo.extend.filter.register("after_generate", () => generator(hexo), Number.MAX_VALUE);
    hexo.extend.deployer.register("wayback_machine", () => deploy(hexo));
}