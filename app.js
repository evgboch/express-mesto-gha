const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const catchErrors = require('./middlewares/errors');
const mainRouter = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(mainRouter);
app.use(errors());
app.use(catchErrors);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
