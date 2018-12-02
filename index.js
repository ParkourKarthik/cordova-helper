#! /usr/bin/env node
// module imports
const path = require('path');
const fs = require('fs');
const sh = require('shelljs');
const replace = require('replace-in-file');
const common = require('./lib/common');

//var packageJson = require(path.resolve(process.cwd(), './package.json'));
const cordovaConfig = require(path.resolve(process.cwd(), './cordova-helper.json'));

const cordovaCreate = require('./lib/cordova-create');
const cordovaRun = require('./lib/cordova-run');
const cordovawww = require('./lib/cordova-www');

//var config = packageJson['cordova-helper'] || {};

const distPath = path.resolve(cordovaConfig.distFolder);
const platform = cordovaConfig.platform;
const temp = path.resolve(process.cwd(), common.tempFolder);
const indexFileName = cordovaConfig.indexFileName ? cordovaConfig.indexFileName : common.dIndexFileName;
const indexFilePath = `${temp}/${indexFileName}`;
if (!fs.existsSync(temp)) {
    sh.exec("md " + temp);
}

sh.cp('-R',`${distPath}/`, `${temp}/`);
console.log("copied dist files to temp");

if (fs.existsSync(indexFilePath)) {
    const options = {
        files: indexFilePath,
        from: ['<base href="/">', '<base href="./">'],
        to: '<base href="./">'
    }
    // usually this base exists for web applications. This has to be replaced in this format for server application.
    const changes = replace.sync(options);
    // in case if the base tag is not present insert a server format base uri.
    if (!changes) {
        const optionsAdd = {
            files: indexFilePath,
            from: '</head>',
            to: '<base href="./"></head>'
        }
        replace.sync(optionsAdd);
        console.log("add base href");
    }
}

// adding cordova js script reference. This is mandatory for cordova usage.
const options = {
    files: indexFilePath,
    from: '</head>',
    to: '<script type="text/javascript" src="cordova.js"></script></head>'
}
const changes = replace.sync(options);
console.log("add cordova.js");


const temp_app = common.cordAppName;
if (!fs.existsSync(temp_app)) {
    cordovaCreate.create(temp_app);
}

console.log("created cordova app");


cordovawww.copywww();
console.log("copied temp files to cordova www");

// run cordova from the project folder
cordovaRun.runCordova(temp_app,platform);
