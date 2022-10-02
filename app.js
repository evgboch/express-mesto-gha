const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(3000);
