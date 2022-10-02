const router = require('express').Router();
const {
  getUsersList, getUser, createUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersList);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserInfo);

module.exports = router;
