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

app.get('/countries', (request, response) => {
  response.send({error: "", data:
    [
      'China',
      'Vietnam',
      'Cambodia',
      'Thailand',
      'Myanmar'
    ]}
  )
});

app.get('/swiperphotos', (request, response) => {
  response.send({error: "", data: {
    'China': ['http://localhost:3000/images/rot1.jpg', 'http://localhost:3000/images/rot2.jpg'],
    'Vietnam': ['http://localhost:3000/images/rot3.jpg'],
  }});
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
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales, ante id imperdiet blandit, diam augue ullamcorper nibh, id laoreet magna est ac lacus. Aenean bibendum gravida tellus, non pretium nunc consectetur aliquam. Maecenas vitae augue elementum, placerat orci a, venenatis libero. Ut quam lectus, tempus non quam vitae, egestas volutpat odio. Suspendisse in porta massa. Mauris ac lectus hendrerit, vehicula nibh in, dignissim tellus. Ut molestie erat et consequat posuere. Quisque vitae aliquam erat. Nulla imperdiet arcu turpis, et mattis tellus accumsan non. Aenean malesuada metus non auctor posuere. Etiam aliquet eget nisi eget vulputate. Mauris nec ante efficitur, ultricies ligula id, ultricies elit. Donec tincidunt molestie elit, nec sagittis felis tincidunt in. Curabitur molestie, quam at suscipit auctor, neque justo imperdiet tellus, sed ultrices erat est id nibh. Sed at elit dolor. Sed maximus nisl vel massa mollis egestas. Morbi felis ex, luctus et vestibulum sed, tincidunt a lorem. Curabitur commodo tellus consectetur tortor mollis, eget porta enim congue. Praesent rutrum fermentum nunc eget commodo. Quisque ac mi magna. In cursus non tortor a ultricies. Suspendisse sed ultricies tortor. Curabitur maximus turpis ac scelerisque aliquet. Pellentesque facilisis porta aliquam. Donec interdum mattis dignissim. Aliquam vitae gravida risus. Morbi sit amet consequat tellus. Nunc sit amet dui eget augue pretium facilisis sit amet suscipit massa. Nullam imperdiet justo arcu, tristique varius mi fermentum non. Praesent consectetur velit ac justo dapibus sodales. In vel diam eget libero sagittis euismod at sit amet enim. Suspendisse euismod tellus ipsum, nec pellentesque est porttitor non.',
          commentsCount: 3
        },
        {
          id: 2,
          createdAt: '2018-08-01 12:52:22',
          title: 'Why I love Winter: A short story',
          tags: ['#winter', '#love', '#snow', '#january'],
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales, ante id imperdiet blandit, diam augue ullamcorper nibh, id laoreet magna est ac lacus. Aenean bibendum gravida tellus, non pretium nunc consectetur aliquam. Maecenas vitae augue elementum, placerat orci a, venenatis libero. Ut quam lectus, tempus non quam vitae, egestas volutpat odio. Suspendisse in porta massa. Mauris ac lectus hendrerit, vehicula nibh in, dignissim tellus. Ut molestie erat et consequat posuere. Quisque vitae aliquam erat. Nulla imperdiet arcu turpis, et mattis tellus accumsan non. Aenean malesuada metus non auctor posuere. Etiam aliquet eget nisi eget vulputate. Mauris nec ante efficitur, ultricies ligula id, ultricies elit. Donec tincidunt molestie elit, nec sagittis felis tincidunt in. Curabitur molestie, quam at suscipit auctor, neque justo imperdiet tellus, sed ultrices erat est id nibh. Sed at elit dolor. Sed maximus nisl vel massa mollis egestas. Morbi felis ex, luctus et vestibulum sed, tincidunt a lorem. Curabitur commodo tellus consectetur tortor mollis, eget porta enim congue. Praesent rutrum fermentum nunc eget commodo. Quisque ac mi magna. In cursus non tortor a ultricies. Suspendisse sed ultricies tortor. Curabitur maximus turpis ac scelerisque aliquet. Pellentesque facilisis porta aliquam. Donec interdum mattis dignissim. Aliquam vitae gravida risus. Morbi sit amet consequat tellus. Nunc sit amet dui eget augue pretium facilisis sit amet suscipit massa. Nullam imperdiet justo arcu, tristique varius mi fermentum non. Praesent consectetur velit ac justo dapibus sodales. In vel diam eget libero sagittis euismod at sit amet enim. Suspendisse euismod tellus ipsum, nec pellentesque est porttitor non.',
          commentsCount: 3
        },
        {
          id: 3,
          createdAt: '2018-08-01 12:52:22',
          title: 'Why I love Winter: A short story',
          tags: ['#winter', '#love', '#snow', '#january'],
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales, ante id imperdiet blandit, diam augue ullamcorper nibh, id laoreet magna est ac lacus. Aenean bibendum gravida tellus, non pretium nunc consectetur aliquam. Maecenas vitae augue elementum, placerat orci a, venenatis libero. Ut quam lectus, tempus non quam vitae, egestas volutpat odio. Suspendisse in porta massa. Mauris ac lectus hendrerit, vehicula nibh in, dignissim tellus. Ut molestie erat et consequat posuere. Quisque vitae aliquam erat. Nulla imperdiet arcu turpis, et mattis tellus accumsan non. Aenean malesuada metus non auctor posuere. Etiam aliquet eget nisi eget vulputate. Mauris nec ante efficitur, ultricies ligula id, ultricies elit. Donec tincidunt molestie elit, nec sagittis felis tincidunt in. Curabitur molestie, quam at suscipit auctor, neque justo imperdiet tellus, sed ultrices erat est id nibh. Sed at elit dolor. Sed maximus nisl vel massa mollis egestas. Morbi felis ex, luctus et vestibulum sed, tincidunt a lorem. Curabitur commodo tellus consectetur tortor mollis, eget porta enim congue. Praesent rutrum fermentum nunc eget commodo. Quisque ac mi magna. In cursus non tortor a ultricies. Suspendisse sed ultricies tortor. Curabitur maximus turpis ac scelerisque aliquet. Pellentesque facilisis porta aliquam. Donec interdum mattis dignissim. Aliquam vitae gravida risus. Morbi sit amet consequat tellus. Nunc sit amet dui eget augue pretium facilisis sit amet suscipit massa. Nullam imperdiet justo arcu, tristique varius mi fermentum non. Praesent consectetur velit ac justo dapibus sodales. In vel diam eget libero sagittis euismod at sit amet enim. Suspendisse euismod tellus ipsum, nec pellentesque est porttitor non.',
          commentsCount: 3
        }
      ]
    };
  };
  response.send({error: "", data: output});
});

app.get('/recentPosts', (request, response) => {
  const output = [
    {
      id: 1,
      createdAt: '2018-08-01 12:52:22',
      title: 'Why I love Winter: A short story',
      tags: ['#winter', '#love', '#snow', '#january'],
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales, ante id imperdiet blandit, diam augue ullamcorper nibh, id laoreet magna est ac lacus. Aenean bibendum gravida tellus, non pretium nunc consectetur aliquam. Maecenas vitae augue elementum, placerat orci a, venenatis libero. Ut quam lectus, tempus non quam vitae, egestas volutpat odio. Suspendisse in porta massa. Mauris ac lectus hendrerit, vehicula nibh in, dignissim tellus. Ut molestie erat et consequat posuere. Quisque vitae aliquam erat. Nulla imperdiet arcu turpis, et mattis tellus accumsan non. Aenean malesuada metus non auctor posuere. Etiam aliquet eget nisi eget vulputate. Mauris nec ante efficitur, ultricies ligula id, ultricies elit. Donec tincidunt molestie elit, nec sagittis felis tincidunt in. Curabitur molestie, quam at suscipit auctor, neque justo imperdiet tellus, sed ultrices erat est id nibh. Sed at elit dolor. Sed maximus nisl vel massa mollis egestas. Morbi felis ex, luctus et vestibulum sed, tincidunt a lorem. Curabitur commodo tellus consectetur tortor mollis, eget porta enim congue. Praesent rutrum fermentum nunc eget commodo. Quisque ac mi magna. In cursus non tortor a ultricies. Suspendisse sed ultricies tortor. Curabitur maximus turpis ac scelerisque aliquet. Pellentesque facilisis porta aliquam. Donec interdum mattis dignissim. Aliquam vitae gravida risus. Morbi sit amet consequat tellus. Nunc sit amet dui eget augue pretium facilisis sit amet suscipit massa. Nullam imperdiet justo arcu, tristique varius mi fermentum non. Praesent consectetur velit ac justo dapibus sodales. In vel diam eget libero sagittis euismod at sit amet enim. Suspendisse euismod tellus ipsum, nec pellentesque est porttitor non.',
      commentsCount: 3
    },
    {
      id: 2,
      createdAt: '2018-08-01 12:52:22',
      title: 'Why I love Winter: A short story',
      tags: ['#winter', '#love', '#snow', '#january'],
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales, ante id imperdiet blandit, diam augue ullamcorper nibh, id laoreet magna est ac lacus. Aenean bibendum gravida tellus, non pretium nunc consectetur aliquam. Maecenas vitae augue elementum, placerat orci a, venenatis libero. Ut quam lectus, tempus non quam vitae, egestas volutpat odio. Suspendisse in porta massa. Mauris ac lectus hendrerit, vehicula nibh in, dignissim tellus. Ut molestie erat et consequat posuere. Quisque vitae aliquam erat. Nulla imperdiet arcu turpis, et mattis tellus accumsan non. Aenean malesuada metus non auctor posuere. Etiam aliquet eget nisi eget vulputate. Mauris nec ante efficitur, ultricies ligula id, ultricies elit. Donec tincidunt molestie elit, nec sagittis felis tincidunt in. Curabitur molestie, quam at suscipit auctor, neque justo imperdiet tellus, sed ultrices erat est id nibh. Sed at elit dolor. Sed maximus nisl vel massa mollis egestas. Morbi felis ex, luctus et vestibulum sed, tincidunt a lorem. Curabitur commodo tellus consectetur tortor mollis, eget porta enim congue. Praesent rutrum fermentum nunc eget commodo. Quisque ac mi magna. In cursus non tortor a ultricies. Suspendisse sed ultricies tortor. Curabitur maximus turpis ac scelerisque aliquet. Pellentesque facilisis porta aliquam. Donec interdum mattis dignissim. Aliquam vitae gravida risus. Morbi sit amet consequat tellus. Nunc sit amet dui eget augue pretium facilisis sit amet suscipit massa. Nullam imperdiet justo arcu, tristique varius mi fermentum non. Praesent consectetur velit ac justo dapibus sodales. In vel diam eget libero sagittis euismod at sit amet enim. Suspendisse euismod tellus ipsum, nec pellentesque est porttitor non.',
      commentsCount: 3
    }
  ];
  response.send({error: "", data: output});
});

app.get('/post/:id', (request, response) => {
  const output = 
    {
      id: 1,
      createdAt: '2018-08-01 12:52:22',
      title: 'Why I love Winter: A short story',
      tags: ['#winter', '#love', '#snow', '#january'],
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales, ante id imperdiet blandit, diam augue ullamcorper nibh, id laoreet magna est ac lacus. Aenean bibendum gravida tellus, non pretium nunc consectetur aliquam. Maecenas vitae augue elementum, placerat orci a, venenatis libero. Ut quam lectus, tempus non quam vitae, egestas volutpat odio. Suspendisse in porta massa. Mauris ac lectus hendrerit, vehicula nibh in, dignissim tellus. Ut molestie erat et consequat posuere. Quisque vitae aliquam erat. Nulla imperdiet arcu turpis, et mattis tellus accumsan non. Aenean malesuada metus non auctor posuere. Etiam aliquet eget nisi eget vulputate. Mauris nec ante efficitur, ultricies ligula id, ultricies elit. Donec tincidunt molestie elit, nec sagittis felis tincidunt in. Curabitur molestie, quam at suscipit auctor, neque justo imperdiet tellus, sed ultrices erat est id nibh. Sed at elit dolor. Sed maximus nisl vel massa mollis egestas. Morbi felis ex, luctus et vestibulum sed, tincidunt a lorem. Curabitur commodo tellus consectetur tortor mollis, eget porta enim congue. Praesent rutrum fermentum nunc eget commodo. Quisque ac mi magna. In cursus non tortor a ultricies. Suspendisse sed ultricies tortor. Curabitur maximus turpis ac scelerisque aliquet. Pellentesque facilisis porta aliquam. Donec interdum mattis dignissim. Aliquam vitae gravida risus. Morbi sit amet consequat tellus. Nunc sit amet dui eget augue pretium facilisis sit amet suscipit massa. Nullam imperdiet justo arcu, tristique varius mi fermentum non. Praesent consectetur velit ac justo dapibus sodales. In vel diam eget libero sagittis euismod at sit amet enim. Suspendisse euismod tellus ipsum, nec pellentesque est porttitor non.',
      commentsCount: 3
    }
  ;
  response.send({error: "", data: output});
});

app.post('/addNewPost', (request, response) => {
  response.status(500).send({error: "Couldnt add a new post", data: "all righty"});
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
