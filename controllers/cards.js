const Card = require('../models/card');
const {
  handleBadRequestError,
  handleDefaultError,
  handleNotFoundError,
  handleForbiddenError,
} = require('../utils/errors');

function getCardsList(req, res) {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      handleDefaultError(res);
    });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleBadRequestError(res);
      } else {
        handleDefaultError(res);
      }
    });
}

function deleteCard(req, res) {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error();
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removedCard) => {
            res.send(removedCard);
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
      } else {
        const error = new Error();
        error.name = 'ForbiddenError';
        throw error;
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        handleBadRequestError(res);
      } else if (err.name === 'DocumentNotFoundError') {
        handleNotFoundError(res);
      } else if (err.name === 'ForbiddenError') {
        handleForbiddenError(res);
      } else {
        handleDefaultError(res);
      }
    });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
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
    .then((card) => {
      res.send(card);
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

function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
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
    .then((card) => {
      res.send(card);
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

module.exports = {
  getCardsList,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
