const router = require('express').Router();
const {
  getUsersList, getUser, updateUserInfo, updateUserAvatar, getOwnInfo,
} = require('../controllers/users');

router.get('/me', getOwnInfo);
router.get('/', getUsersList);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserInfo);

module.exports = router;
