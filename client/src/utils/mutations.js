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

export const ADD_BAND = gql`
    mutation addBand($bandName: String!, $genre: String, $manager: String, $managerEmail: String, $currentInstruments: [String], $neededInstruments: [String], $video: String, $picture: String) {
        addBand(bandName: $bandName, genre: $genre, manager: $manager, managerEmail: $managerEmail, currentInstruments: $currentInstruments, neededInstruments: $neededInstruments, video: $video, picture: $picture) {
            _id
            bandName
            username
            genre
            manager
            managerEmail
            currentInstruments
            neededInstruments
            video
            picture
        }
    }
`;
