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

    type Query {
        users: [User]
        user(username: String!): User
        bands(username: String): [Band]
        band(_id: ID!): Band
    }

    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
    }



`;


module.exports = typeDefs;