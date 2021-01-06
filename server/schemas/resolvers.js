const { User, Band, Message } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('bands')
                .populate('messages');
            
            return userData;

            }

            throw new AuthenticationError('You are not logged in');
        },

        bands: async (parent, { bandName }) => {
            const params = bandName ? { bandName } : {};
            return Band.find(params).sort({ createdAt: -1 });
        },

        band: async (parent, { _id }) => {
            return Band.findOne({ _id });
        },

        users: async () => {
            return User.find().sort({ createdAt: -1 })
                .select('-__v -password')
                .populate('bands');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('bands');
        },

        messages: async (parent, { username, recipientUsername }) => {
            const params = username && recipientUsername ? { username, recipientUsername } : {};
            return Message.find(params).sort({ createdAt: -1 });
        },

    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with those credentials!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('No user with those credentials!');
            }

            const token = signToken(user);
            return { token, user };
        },

        addBand: async (parent, args, context) => {
            if (context.user) {
                const band = await Band.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { bands: band._id } },
                    { new: true }
                );

                return band;
            }

            throw new AuthenticationError('You must be logged in to add a band!');
        },

        addMessage: async (parent, args, context) => {
            if (context.user) {
                const message = await Message.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { messages: message._id } },
                    { new: true }
                );
                await User.findOneAndUpdate(
                    { username: message.recipientUsername },
                    { $push: { messages: message._id } },
                    { new: true }
                );

                return message;
            }

            throw new AuthenticationError('You must be logged in to add a band!');
        }
    }
  };
  
  module.exports = resolvers;