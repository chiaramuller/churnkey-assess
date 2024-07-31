const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let users = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.post('/api/register', require('./api/register'));
app.post('/api/login', require('./api/login'));
app.post('/api/logout', require('./api/logout'));
app.post('/api/updateProfile', require('./api/updateProfile'));

module.exports = {
    path: '/api',
    handler: app
};
