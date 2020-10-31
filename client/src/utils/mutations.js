import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $bio: String, $instruments: [String!]!, $bands: [String]) {
    addUser(username: $username, email: $email, password: $password, bio: $bio, instruments: $instruments, bands: $bands) {
      token
      user {
        _id
        username
      }
    }
  }
`;