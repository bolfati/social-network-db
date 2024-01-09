const router = require('express').Router();
const { getAUser, getEveryUser, makeUser, updateUser, removeUser, addNewFriend, removeNewFriend } = require('../../controllers/userController');
router.route('/').get(getEveryUser).post(makeUser);
router.route('/:userId').get(getAUser).put(updateUser).delete(removeUser);
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeNewFriend);

module.exports = router;