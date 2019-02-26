# Travelling blog frontend

## Description

This is a frontend of the travelling blog writen in angular 6 with redux pattern. It's written in angular 7 with redux pattern
for state management.

## Prequisites

* npm > v6.5.0
* node > v11.6.0

## Installation and setting required env variables

```
$ npm install
$ export API_KEY=""
$ export CONTENT_KEY=""
```

## Running in development mode

```
$ npm run start
```

This will build the project first and then run a webpack dev server - it will listen to all changes in the filesystem and rebuild
the website accordingly (hmr). Dev webpack, along with dev API urls, will be used.

## Running in production mode

```
$ npm run start:prod
```

This will build the project in production mode, and run a small node server which serves as production facade. Production webpack
will be used, along with production API urls.

## Linting and executing tests

```
$ npm run lint
$ npm run test
```

@TODO This should be a githook.

## Measuring bundle performance

* set the *SHOW_BUNDLE_ANALYZER* flag in constants.js to true in order to analyze the bundle

## Deployment

```
$ docker-compose build
$ docker-compose up -d
```

## AoT support

All available commands run in the AoT mode except for *npm run test* (which uses different webpack config)
