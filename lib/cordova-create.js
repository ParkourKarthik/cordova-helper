#! /usr/bin/env node
const sh = require('shelljs');

exports.create = function(name) {
    sh.exec("node_modules/cordova-helper/node_modules/cordova/bin/cordova.cmd create " + name);
};