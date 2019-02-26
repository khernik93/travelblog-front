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
$ export API_KEY=""
$ export CONTENT_KEY=""
$ npm run start
```

This will build the project and run a webpack dev server - it will listen to all changes in the filesystem and rebuild
the website accordingly.

## Running in production mode

```
$ export API_KEY=""
$ export CONTENT_KEY=""
$ npm run start:prod
```

This will build the project in production mode, and run a small node server which serves as production facade.

## Linting and executing tests

```
$ npm run lint
$ npm run test
```

## Measuring bundle performance

* set the *SHOW_BUNDLE_ANALYZER* flag in constants.js to true in order to analyze the bundle

## Deployment

```
$ docker-compose build
$ docker-compose up -d
```

## AoT support

All available commands run in the AoT mode except for *npm run test* (which uses different webpack config)
