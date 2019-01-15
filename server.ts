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
  let output = {};
  if (tab === 'China') {
    output = {
      meta: {
        total: 5,
        start: 0,
        end: 2
      },
      content: [
        {
          id: 1,
          createdAt: '2018-08-01 12:52:22',
          title: 'Why I love Winter: A short story',
          tags: ['#winter', '#love', '#snow', '#january'],
          content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem a consequat. Proin nec interdum sem. Quisque in porttitor magna, a imperdiet est. </p>',
          commentsCount: 3
        },
        {
          id: 2,
          createdAt: '2018-08-01 12:52:22',
          title: 'Why I love Winter: A short story',
          tags: ['#winter', '#love', '#snow', '#january'],
          content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem a consequat. Proin nec interdum sem. Quisque in porttitor magna, a imperdiet est. </p>',
          commentsCount: 3
        },
        {
          id: 3,
          createdAt: '2018-08-01 12:52:22',
          title: 'Why I love Winter: A short story',
          tags: ['#winter', '#love', '#snow', '#january'],
          content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem a consequat. Proin nec interdum sem. Quisque in porttitor magna, a imperdiet est. </p>',
          commentsCount: 3
        }
      ]
    };
  };
  response.send(JSON.stringify(output));
});

app.listen(3001, () => {
  console.log(`Listening on port 3001`);
});
