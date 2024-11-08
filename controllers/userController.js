const { User } = require('../models')

module.exports = {

    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('thoughts-__V');

            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneandUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete user
    async deleteUser(req, res) {
        try {
            const user = await user.findOneAndDelete({ _id: req.params.thoughId });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //add friend
    async addFriend(req, res) {

        try {
            const user = await User.findOneandUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found!' })
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },


};