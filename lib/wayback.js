"use strict";

/**
 * @param {AsyncIteratorObject<string>} readline
 */
module.exports = async function (readline) {
    for await (const site of readline) {
        await fetch(`https://web.archive.org/save/${site.trim()}`)
            .then(res => {
                if (res.ok) {
                    console.log('✔️', "Archived", site);
                }
            })
            .catch(err => {
                console.error('❌', "Failed to archive site:", site);
                console.error(err);
            });
    }
}