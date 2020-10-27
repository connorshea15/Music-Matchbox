const { gql } = require('apollo-server-express');


const typeDefs = gql`

    type Band {
        _id: ID
        bandName: String
        username: String
        genre: String
        manager: String
        managerEmail: String
        currentInstruments: [String]
        neededInstruments: [String]
        video: String
        picture: String
    }

    type Query {
        bands: [Band]
    }



`;


module.exports = typeDefs;