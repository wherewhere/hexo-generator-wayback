#!/usr/bin/env node
const url = process.argv[2];
if (!url) {
    console.error("No URL provided.");
    return;
}
const fetch = require("fetchline");
const urls = fetch(url);
console.log("Fetching urls from", url);
require("./lib/wayback")(urls);