const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const incorrectPathRouter = require('./routes/incorrectPath');
const checkAuthorization = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const catchErrors = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(checkAuthorization);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', incorrectPathRouter);
app.use(errors());
app.use(catchErrors);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
