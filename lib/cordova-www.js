#! /usr/bin/env node
const sh = require('shelljs');
const common = require('./common');


exports.copywww = function() {
    //clean the cord-app directory
    sh.rm('-rf',`${common.cordAppName}/www/*`);
    // copy from out to cord-app
    sh.cp('-R', `${common.tempFolder}/*`, `${common.cordAppName}/www/`);
};