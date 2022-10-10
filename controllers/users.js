const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// eslint-disable-next-line max-len
// const { handleBadRequestError, handleDefaultError, handleNotFoundError } = require('../utils/errors');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');
// const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
// const UnauthorizedError = require('../errors/Unauthorized');

function getUsersList(req, res, next) {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
}

function getUser(req, res, next) {
  User.findById(req.params.userId)
    .orFail(() => {
      // const error = new Error();
      // error.name = 'DocumentNotFoundError';
      throw new NotFoundError('Пользователь с указанным идентификатором не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // handleBadRequestError(res);
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
      }
      // else if (err.name === 'DocumentNotFoundError') {
      //   handleNotFoundError(res);
      // }
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // handleBadRequestError(res);
        next(new BadRequestError('Вы передали некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанной почтой уже существует'));
      } else {
        next(err);
      }
    });
}

function updateUserInfo(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      // const error = new Error();
      // error.name = 'DocumentNotFoundError';
      throw new NotFoundError('Пользователь с указанным идентификатором не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
      }
      // else if (err.name === 'DocumentNotFoundError') {
      //   handleNotFoundError(res);
      // }
    });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      // const error = new Error();
      // error.name = 'DocumentNotFoundError';
      throw new NotFoundError('Пользователь с указанным идентификатором не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
      }
      // else if (err.name === 'DocumentNotFoundError') {
      //   handleNotFoundError(res);
      // }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserWithCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'top-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      // res.status(401);
      // res.send({ message: err.message });
      if (err.name === 'ValidationError') {
        // handleBadRequestError(res);
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
      }
    });
}

function getOwnInfo(req, res, next) {
  User.findById(req.user._id)
    .orFail(() => {
      // const error = new Error();
      // error.name = 'DocumentNotFoundError';
      throw new NotFoundError('Пользователь с указанным идентификатором не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
      }
      // else if (err.name === 'DocumentNotFoundError') {
      //   handleNotFoundError(res);
      // }
    });
}

module.exports = {
  getUsersList,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getOwnInfo,
};
