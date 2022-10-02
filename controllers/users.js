const User = require('../models/user');

function getUsersList(req, res) {
  User.find({})
    .then((users) => {
      res.send(users);
    });
}

function getUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    });
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name , about },
    { new: true }
    )
    .then((user) => {
      res.send(user);
    })
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true }
    )
    .then((user) => {
      res.send(user);
    })
}

module.exports = {
  getUsersList,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
};
