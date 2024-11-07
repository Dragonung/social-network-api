const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought } = require('../models')

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('thoughtText');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('thoughtText');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'User not found!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create reaction for single thought
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought with that ID found.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if(!thought) {
                return res
                .status(404)
                .json({ message: 'No thought with that ID found.' });
            }

            res.json(thought);
        }   catch (err) {
            res.status(500).json(err);
        }
    },
};