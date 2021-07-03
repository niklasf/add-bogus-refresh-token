const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const port = 9700;
const backend = 'http://localhost:9663';

app.get('/oauth', proxy(backend));

app.listen(port);
