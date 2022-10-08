const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleBadRequestError, handleDefaultError, handleNotFoundError } = require('../utils/errors');

function getUsersList(req, res) {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      handleDefaultError(res);
    });
}

function getUser(req, res) {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error();
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        handleBadRequestError(res);
      } else if (err.name === 'DocumentNotFoundError') {
        handleNotFoundError(res);
      } else {
        handleDefaultError(res);
      }
    });
}

function createUser(req, res) {
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
        handleBadRequestError(res);
      } else {
        handleDefaultError(res);
      }
    });
}

function updateUserInfo(req, res) {
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
      const error = new Error();
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        handleBadRequestError(res);
      } else if (err.name === 'DocumentNotFoundError') {
        handleNotFoundError(res);
      } else {
        handleDefaultError(res);
      }
    });
}

function updateUserAvatar(req, res) {
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
      const error = new Error();
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        handleBadRequestError(res);
      } else if (err.name === 'DocumentNotFoundError') {
        handleNotFoundError(res);
      } else {
        handleDefaultError(res);
      }
    });
}

function login(req, res) {
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
      res
        .status(401)
        .send({ message: err.message });
    });
}

module.exports = {
  getUsersList,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
