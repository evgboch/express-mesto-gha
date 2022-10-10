const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
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
app.post('/signin', login);
app.post('/signup', createUser);
app.use(checkAuthorization);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', incorrectPathRouter);
app.use(catchErrors);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
