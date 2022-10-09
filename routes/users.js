const router = require('express').Router();
const {
  getUsersList, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersList);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserInfo);

module.exports = router;
