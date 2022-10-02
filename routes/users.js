const router = require('express').Router();
const { getUsersList, getUser, createUser } = require('../controllers/users');

router.get('/', getUsersList);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;
