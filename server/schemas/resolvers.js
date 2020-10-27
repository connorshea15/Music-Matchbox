const { User, Band } = require('../models');

const resolvers = {
    Query: {
        bands: async () => {
            return Band.find();
        }
    }
  };
  
  module.exports = resolvers;