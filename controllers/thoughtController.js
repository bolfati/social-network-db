const { Thought, User } = require('../models');
module.exports = {
    async getThought(req, res) {
        try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'unable to find this thought' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);}
    },

    async getEveryThought(req, res) {
        try {
        const thought = await Thought.find({});
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);}
    },
    async haveAThought(req, res) {
        try {
            const brandNewThought = await Thought.create(req.body);
            const { username } = req.body;

        await User.findOneAndUpdate( { username: username }, { $push: { thoughts: brandNewThought._id } }, { new: true } );

        res.json(brandNewThought);
    } catch (err) {
        res.status(400).json(err);}
    },