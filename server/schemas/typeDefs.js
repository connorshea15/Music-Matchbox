const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Band {
        _id: ID
        createdAt: String
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

    type Message {
        _id: ID
        username: String
        recipientUsername: String
        messageBody: String
        createdAt: String
    }

    type Thread {
        _id: ID
        username1: String
        username2: String
        messages: [Message]
    }

    type User {
        _id: ID
        createdAt: String
        username: String
        firstName: String
        lastName: String
        email: String
        bio: String
        messages: [Message]
        threads: [Thread]
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
        threads: [Thread]
        thread(username: String!): Thread
        message(recipientUsername: String!): Message
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, bio: String, instruments: [String!]!, bands: [String]): Auth
        addBand(bandName: String!, genre: String, manager: String, managerEmail: String, currentInstruments: [String], neededInstruments: [String], video: String, picture: String): Band
        addMessage(messageBody: String!, recipientUsername: String!): Message
    }
`;

module.exports = typeDefs;