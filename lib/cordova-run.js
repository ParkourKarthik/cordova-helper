#! /usr/bin/env node
const sh = require('shelljs');

// cordova run should be executed from the project folder only. The \\ used is the only way to execute cordova from project folder directly.
exports.runCordova = function(path, platform) {
    sh.exec("cd " + path + " & ..\\node_modules\\cordova-helper\\node_modules\\cordova\\bin\\cordova.cmd platform add " + platform);
    sh.exec("cd " + path + " & ..\\node_modules\\cordova-helper\\node_modules\\cordova\\bin\\cordova.cmd run " + platform);
};