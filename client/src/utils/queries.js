import gql from 'graphql-tag';

export const QUERY_BANDS = gql`
query bands($username: String) {
    bands(username: $username) {
      _id
      bandName
      genre
      currentInstruments
      neededInstruments
      picture
    }
  }
`;