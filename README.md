# Cordova-helper

This is a simple utility to convert web application projects to hybrid app with ease using cordova (https://cordova.apache.org/).

This app could be integrated with your hybrid project for instant hybrid build.

This is a prototype with **android platform only working**. It is expected to face issues. Kindly report the issues.

## Install

> npm install cordova-helper --save-dev


## Configuration

The app's main configuration in `cordova-helper.json`:
- `distFolder` : pointer for web app's distributables.
- `indexFileName`: name of the index file (root file).
- `platform`: native platform to build.

Configure your package.json script section:
> scripts : {
>    build-hybrid: "cordova-helper"
>}

## Usage

> npm run build-hybrid


## Output

> Android: cord-app/platforms/android/app/build/outputs


Possible upcoming features:
- file watcher with remote debugger using adb
- ios platform

*Note: Cordova expects android SDK installed already.*