const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6338e2e60ed9a72a2dcc38e0',
  };

  next();
});
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(3000);
