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
    'Vietnam': ['http://localhost:3000/images/rot3.jpg'],
  }));
});

app.get('/posts', (request, response) => {
  const tab = request.query.tab;
  let output = [];
  if (tab === 'China') {
    output = [
      {
        createdAt: '2018-08-01 12:52:22',
        title: 'djksfdsfdsf',
        tags: ['#dsfds', '#fsdf', '#fdsf', '#dsasdasd'],
        content: 'fdsjfkdsjfkdsfjdsjf f dsfdj fds jlfk d'
      },
      {
        createdAt: '2018-08-01 12:52:22',
        title: 'djksfdsfdsf',
        tags: ['#dsfds', '#fsdf', '#fdsf', '#dsasdasd'],
        content: 'fdsjfkdsjfkdsfjdsjf f dsfdj fds jlfk d'
      },
      {
        createdAt: '2018-08-01 12:52:22',
        title: 'djksfdsfdsf',
        tags: ['#dsfds', '#fsdf', '#fdsf', '#dsasdasd'],
        content: 'fdsjfkdsjfkdsfjdsjf f dsfdj fds jlfk d'
      }
    ];
  }
  response.send(JSON.stringify(output));
});

app.listen(3001, () => {
  console.log(`Listening on port 3001`);
});
