const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const incorrectPathRouter = require('./routes/incorrectPath');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6338e2e60ed9a72a2dcc38e0',
  };

  next();
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', incorrectPathRouter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
