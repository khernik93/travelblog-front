const express = require('express');
const request = require('request');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const app = express();

app.use(express.static('dist'));

app.all('/api/*', function (req, res) {
  apiProxy.web(req, res, { target: 'http://127.0.0.1:3001' });
});

app.all('/resources/*', function (req, res) {
  apiProxy.web(req, res, { target: 'http://127.0.0.1:3001', pathRewrite: {
    '^/resources': ''
  } });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
