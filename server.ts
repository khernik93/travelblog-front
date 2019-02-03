"use strict";
const express = require('express'),
  path = require('path'),
  cors = require('cors');

const app = express();

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Set-Cookie");
  res.header("Content-Type", "application/json");
  next();
});

app.post('/signIn', (request, response) => {
  const options = {
    maxAge: 1000 * 60 * 60,
    httpOnly: false
  }
  response.cookie('SESSIONID', 'some-strange-random-cookie-here', options);
  response.status(200).send({error: "Credentials invalid", data: "aaa"});
});

app.listen(3001, () => {
  console.log(`Listening on port 3001`);
});
