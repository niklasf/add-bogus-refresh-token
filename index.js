const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const port = 9700;
const backend = 'http://localhost:9663';

app.get('/oauth', proxy(backend));

app.post('/oauth', proxy(backend, {
  userResDecorator: (_proxyRes, proxyResData, _userReq, _userRes) => {
    const data = JSON.parse(proxyResData.toString('utf8'));
    if (data.access_token && !data.refresh_token) data.refresh_token = 'invalid_for_bc_' + Math.floor(Math.random() * 10000000);
    return JSON.stringify(data);
  }
}));

app.listen(port);
