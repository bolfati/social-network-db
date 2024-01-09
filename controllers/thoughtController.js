const { Thought, User } = require('../models');
module.exports = {
    async getThought(req, res) {  //grabs one thought by id
        try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'unable to find this thought' });
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);}
    },

    async getEveryThought(req, res) {  //grabs every thought
        try {
        const thought = await Thought.find({});
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);}
    },
    async haveAThought(req, res) { // makes a thought
        try {
            const brandNewThought = await Thought.create(req.body);
            const { username } = req.body;

        await User.findOneAndUpdate( { username: username }, { $push: { thoughts: brandNewThought._id } }, { new: true } );

        res.json(brandNewThought);
    } catch (err) {
        res.status(400).json(err);}
    },
    async changeThought(req, res) { //updates a thought
        try {
            const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'unable to find this thought' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(400).json(err);}
    },
    async removeThought(req, res) { //removes a thought
        try {
            const removedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!removedThought) {
                return res.status(404).json({ message: 'unable to find this thought' });
            }
            res.json(removedThought);
        } catch (err) {
            res.status(400).json(err);}
    },
    async addReaction(req, res) { //adds a reaction to a thought
        try {
            const thoughtDb = await Thought.create(req.body);
            res.json(thoughtDb);
        } catch (err) {
            res.status(400).json(err);}
        },
    async removeReaction(req, res) { //removes a reaction from a thought
        try {
            const userReaction = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!userReaction) {
                return res.status(404).json({ message: 'unable to find this thought' });
            }
        } catch (err) {
            res.status(400).json(err);}
    }};