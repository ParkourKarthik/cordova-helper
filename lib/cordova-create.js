#! /usr/bin/env node
const sh = require('shelljs');
const path = require('path');
const pkg = require(path.resolve(process.cwd(), './package.json'));

exports.create = function(name) {
    sh.exec(`node_modules\\cordova\\bin\\cordova.cmd create ${name} com.hybridapp.${pkg.name} ${pkg.name}`);
};