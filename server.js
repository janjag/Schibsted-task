var express = require('express');
var app = express();
var path = __dirname;

app.use(express.static(`${path}`));
app.get('/', function (req, res) {
  res.sendFile(`${path}/index.html`);
})

app.listen(3100, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3100');
});