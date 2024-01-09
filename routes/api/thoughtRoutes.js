const router = require('express').Router();
const { getThought, getEveryThought, haveAThought, changeThought, removeThought, addReaction, removeReaction } = require('../../controllers/thoughtController');
router.route('/').get(getEveryThought).post(haveAThought);
router.route('/:thoughtId').get(getThought).put(changeThought).delete(removeThought);
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;