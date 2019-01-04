"use strict";
const express = require('express'),
path = require('path');

const app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/countries', (request, response) => {
  response.send(JSON.stringify(
    [
      'China',
      'Vietnam',
      'Cambodia',
      'Thailand',
      'Myanmar'
    ]
  ))
});

app.get('/swiperphotos', (request, response) => {
  response.send(JSON.stringify({
    'China': ['http://localhost:3000/images/rot1.jpg', 'http://localhost:3000/images/rot2.jpg'],
    'Vietnam': ['http://localhost:3000/images/rot2.jpg', 'http://localhost:3000/images/rot3.jpg'],
  }));
});

app.listen(3001, () => {
  console.log(`Listening on port 3001`);
});
