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

    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        bio: String
        instruments: [String]
        bands: [Band]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        bands(bandName: String): [Band]
        band(_id: ID!): Band
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, bio: String, instruments: [String!]!, bands: [String]): Auth
        addBand(bandName: String!, genre: String, manager: String, managerEmail: String, currentInstruments: [String], neededInstruments: [String], video: String, picture: String): Band
    }



`;


module.exports = typeDefs;