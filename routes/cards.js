const router = require('express').Router();
const { getCardsList, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getCardsList);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;