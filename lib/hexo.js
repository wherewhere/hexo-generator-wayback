/* global hexo */
"use strict";

function setSettings(obj, set) {
    if (typeof set === "undefined") {
        return;
    }
    else if (set === null) {
        return;
    }
    else if (typeof obj !== "object" || obj instanceof Array) {
        obj = set;
        return;
    }
    const keys = Object.keys(set);
    if (!keys.length) {
        return;
    }
    function setKey(obj, set) {
        if (typeof set === "undefined") {
            return false;
        }
        else if (set === null) {
            return false;
        }
        else if (typeof obj !== "object" || obj instanceof Array) {
            return true;
        }
        const keys = Object.keys(set);
        if (!keys.length) {
            return true;
        }
        keys.forEach(key => {
            if (setKey(obj[key], set[key])) {
                if (typeof set[key] !== "undefined") {
                    obj[key] = set[key];
                }
            }
        });
        return false;
    }
    keys.forEach(key => {
        if (setKey(obj[key], set[key])) {
            if (typeof set[key] !== "undefined") {
                obj[key] = set[key];
            }
        }
    });
}

/**
 * @param {import("@types/hexo")} hexo
 */
function generator(hexo) {
    const config = { ...hexo.config, ...hexo.theme.config };
    const wayback = {
        enable: true,
        extensions: [".html", ".json"],
        output: "wayback.csv"
    };
    setSettings(wayback, config.wayback);

    if (!wayback.enable) {
        return;
    }

    const route = hexo.route;
    const routeList = route.list();
    const url = hexo.config.url;
    const { basename } = require("path");
    const paths = routeList.filter(path => wayback.extensions.some(x => path.endsWith(x))).map(path => {
        const fileName = basename(path);
        if (fileName === "index.html") {
            return new URL(path.slice(0, -10), url).toString();
        }
        else {
            return new URL(path, url).toString();
        }
    }).sort();
    route.set(wayback.output, () => paths.join('\n'));
}

/**
 * @param {import("@types/hexo")} hexo
 */
function deploy(hexo) {
    const config = { ...hexo.config, ...hexo.theme.config };
    const wayback = {
        enable: true,
        output: "wayback.csv"
    };
    setSettings(wayback, config.wayback);

    if (!wayback.enable) {
        return;
    }

    const public_dir = hexo.public_dir;
    const { join } = require("path");
    const { createReadStream } = require("fs");
    const ReadLine = require("readline");

    const read = createReadStream(join(public_dir, wayback.output), "utf8");
    const readline = ReadLine.createInterface({
        input: read
    });

    return require("./wayback")(readline);
}

module.exports = { generator, deploy };