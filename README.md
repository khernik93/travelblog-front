# Travelling blog frontend

## Description

This is a frontend of the travelling blog writen in angular 6 with redux pattern. 

## Prequisites

* npm > v6.5.0

## Installation

```
$ npm install
```

## Running in development mode

```
$ npm run start
```

## Executing tests

```
$ npm run test
```

## Measuring performance

* set the *SHOW_BUNDLE_ANALYZER* flag in constants.js to true in order to analyze the bundle

## Deployment

```
$ docker build -t <image-name> .
$ docker run -d -it -p 80:3000 <image-name>
```

## AoT support

All available commands run in the AoT mode except for *npm run test* (which uses different webpack config)
