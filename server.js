var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('.'));

app.listen(PORT, '0.0.0.0', function () {
    console.log('Server listening on port: ' + PORT);
});