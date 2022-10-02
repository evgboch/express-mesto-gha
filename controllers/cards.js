const Card = require('../models/card');

function getCardsList(req, res) {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send(card);
    })
}

module.exports = {
  getCardsList,
  createCard,
  deleteCard,
}