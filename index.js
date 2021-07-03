const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const port = 9700;
const backend = 'http://localhost:9004';

app.post('/oauth', proxy(backend, {
  userResDecorator: (_proxyRes, proxyResData, _userReq, _userRes) => {
    const data = JSON.parse(proxyResData.toString('utf8'));
    if (data.access_token && !data.refresh_token) {
      data.refresh_token = 'invalid_for_bc_' + Math.floor(Math.random() * 10000000);
      console.log(`added ${data.refresh_token}`);
    }
    return JSON.stringify(data);
  }
}));

app.listen(port);
