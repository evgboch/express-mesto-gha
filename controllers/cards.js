const Card = require('../models/card');
// const {
//   handleBadRequestError,
//   handleDefaultError,
//   handleNotFoundError,
//   handleForbiddenError,
// } = require('../utils/errors');
const BadRequestError = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
// const UnauthorizedError = require('../errors/Unauthorized');

function getCardsList(req, res, next) {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // handleBadRequestError(res);
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        // handleDefaultError(res);
        next(err);
      }
    });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .orFail(() => {
      // const error = new Error();
      // error.name = 'DocumentNotFoundError';
      throw new NotFoundError('Карточка с указанным идентификатором не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removedCard) => {
            res.send(removedCard);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              // handleBadRequestError(res);
              next(new BadRequestError('Вы передали некорректные данные'));
            } else {
              next(err);
            }
          });
      } else {
        // const error = new Error();
        // error.name = 'ForbiddenError';
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // handleBadRequestError(res);
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
      }

      // else if (err.name === 'ForbiddenError') {
      //   handleForbiddenError(res);
      // }
    });
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      // const error = new Error();
      // error.name = 'DocumentNotFoundError';
      throw new NotFoundError('Карточка с указанным идентификатором не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        // handleBadRequestError(res);
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
      }
    });
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      // const error = new Error();
      // error.name = 'DocumentNotFoundError';
      throw new NotFoundError('Карточка с указанным идентификатором не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        // handleBadRequestError(res);
        next(new BadRequestError('Вы передали некорректные данные'));
      } else {
        next(err);
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
