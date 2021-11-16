global.__root = __dirname + '/';
const express = require('express');
const app = express();
const db = require(__root+'/dbconfig.js');
const cors = require('cors')

const ArticleController = require(__root+'/controller/ArticleController')

app.get('/api', function (req, res) {
    res.status(200).send('API works Very Well.');
});

app.use(cors());
app.use('/article', ArticleController);

module.exports = app;