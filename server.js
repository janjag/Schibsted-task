var express = require('express');
var app = express();
var path = __dirname;

app.use('/dist', express.static(path + '/dist'));
app.get('/', function (req, res) {
  res.sendFile(path + '/index.html');
});

app.get('/advertisers/', function (req, res) {
    const format = req.query.format;
    res.sendFile(path + '/data/response.' + format);
});

app.listen(3100, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3100');
});