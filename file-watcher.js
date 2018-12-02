const fs = require('fs');
const sh = require('shelljs');
const config = require('./cordova-helper.json');
require('log-timestamp');

const watcherPath = config.distFolder;

console.log(`Watching the file changes on path ${watcherPath}`);

let fsWait = false;
fs.watch(watcherPath, (event, filename) => {
    if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 100);

        console.log(`${filename} file changed`);
        sh.exec("node index.js");
    }
});