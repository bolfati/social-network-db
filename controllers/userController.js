const { User, Thought } = require('../models');

module.exports = {
    async getAUser (req, res) { //grabs one user by id
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('friends').populate('thoughts');
            if (!user) {
                return res.status(404).json({ message: 'unable to find this user' });
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async getEveryUser (req, res) { //grabs every user
        try {
            const user = await User.find({}).populate('friends').populate('thoughts');
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }},
        async makeUser (req, res) { // makes a new user
            try {
                const brandNewUser = await User.create(req.body);
                res.json(brandNewUser);
            } catch (err) {
                res.status(400).json(err);
            }},
        async updateUser (req, res) { //updates a user
            try {
                const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true });
            }
            catch (err) {
                res.status(400).json(err);
            }},
        async removeUser (req, res) { //removes a user
            try {
                const removedUser = await User.findOneAndDelete({ _id: req.params.userId });
                if (!removedUser) {
                    return res.status(404).json({ message: 'unable to find this user' });
                }
                res.json(removedUser);
            } catch (err) {
                res.status(400).json(err);
            }},
        async addNewFriend (req, res) { //adds a friend to a user
            const { friendId } = req.params;
            try {
                const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: friendId } }, { new: true });
                if (!user) {
                    return res.status(404).json({ message: 'unable to find this user' });
                }
                res.json(user);
            
            } catch (err) {
            res.status(400).json(err);
        }},
        async removeNewFriend (req, res) { //removes a friend from a user
            try {
                const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

                if (!user) {
                    return res.status(404).json({ message: 'unable to find this user' });
                }
            } catch (err) {
                res.status(400).json(err);
            }
        }};