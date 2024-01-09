const router = require('express').Router();
const { getOneThought, getAllThoughts, makeThought, updateThought, removeThought, addReaction, removeReaction } = require('../../controllers/thoughtController');
router.route('/').get(getAllThoughts).post(makeThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(removeThought);
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports