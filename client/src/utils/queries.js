import gql from 'graphql-tag';

export const QUERY_BANDS = gql`
query bands($bandName: String) {
    bands(bandName: $bandName) {
      _id
      bandName
      username
      genre
      currentInstruments
      neededInstruments
      manager
      managerEmail
      picture
      video
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      firstName
      lastName
      bio
      instruments
      bands {
        _id
        bandName
        genre
        currentInstruments
      }
    }
  }
`;