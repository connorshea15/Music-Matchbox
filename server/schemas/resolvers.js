const { User, Band } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        bands: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Band.find(params);
        },

        band: async (parent, { _id }) => {
            return Band.findOne({ _id });
        },

        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('bands');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('bands');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
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

            return user;
        }
    }
  };
  
  module.exports = resolvers;