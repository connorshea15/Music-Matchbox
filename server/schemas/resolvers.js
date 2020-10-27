const { User, Band } = require('../models');

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
    }
  };
  
  module.exports = resolvers;