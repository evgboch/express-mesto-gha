const { getUsersList, getUser, createUser } = require('../controllers/users');

const router = require('express').Router();

router.get('/', getUsersList);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;