const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const { PROD_API_URL, PROD_CONTENT_URL } = require('../config/constants');

const app = express();

app.use(express.static('dist'));

app.all('/api/*', function (req, res) {
  apiProxy.web(req, res, { target: PROD_API_URL });
});

app.all('/resources/*', function (req, res) {
  apiProxy.web(req, res, { target: PROD_CONTENT_URL, pathRewrite: {
    '^/resources': ''
  } });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
