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