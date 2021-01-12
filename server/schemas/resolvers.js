const { User, Band, Message, Thread } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('bands')
                .populate({
                    path: 'threads',
                    populate: { path: 'messages' }
                });
            
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
                .populate('bands')
                .populate('messages');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('bands')
                .populate('messages');
        },

        threads: async (parent, args, context) => {
            if (context.user) {
                return Thread.find()
                    .populate('messages');
            }

            throw new AuthenticationError('You are not logged in');
        },

        thread: async (parent, { username }, context) => {
            if (context.user) {
                return Thread.findOne({$or:[{username1: context.user.username, username2: username}, {username1: username, username2: context.user.username}]}).populate('messages');
            }

            throw new AuthenticationError('You are not logged in');
        },

        message: async (parent, context, { recipientUsername }) => {
            return Message.findOne({ recipientUsername });

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
                // destructure args so I can access messageBody and recipientUsername
                var {messageBody, recipientUsername} = args;
                const message = await Message.create({ ...args, username: context.user.username });

                // here I am testing to see if the thread already exists
                var thread = await Thread.findOne({$or:[{username1: context.user.username, username2: recipientUsername}, {username1: recipientUsername, username2: context.user.username}]});

                // if thread already exists, simply push the new message to it
                if (thread) {
                    await Thread.findByIdAndUpdate(
                        { _id: thread._id },
                        { $push: { messages: message } },
                        { new: true }
                    )
                // if thread does not exist create it and add it to each user
                } else {
                    var thread = await Thread.create({username1: context.user.username, username2: recipientUsername, messages: message})
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { threads: thread } },
                        { new: true }
                    );
                    await User.findOneAndUpdate(
                        { username: message.recipientUsername },
                        { $push: { messages: thread } },
                        { new: true }
                    );
                }

                return message;
            }

            throw new AuthenticationError('You must be logged in to send a message!');
        }/*,
        addMessage: async (parent, args, context) => {
            if (context.user) {
                const message = await Message.create({ ...args });

                const thread = await Thread.findOne()

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

            throw new AuthenticationError('You must be logged in to send a message!');
        } */
    }
  };
  
  module.exports = resolvers;