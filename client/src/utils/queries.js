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

export const QUERY_USERS = gql`
    query {
        users {
            username
            email
            instruments
            bands {
                _id
                bandName
            }
        }
    }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bio
      instruments
      bands {
        _id
        bandName
        genre
        manager
        currentInstruments
        neededInstruments
      }
    }
  }
`;

export const QUERY_THREADS = gql`
  {
    threads {
      _id
      username1
      username1
    }
  }
`;

export const QUERY_THREAD = gql`
  query thread($username: String!) {
    thread(username: $username) {
      _id
      username1
      username1
      messages {
        messageBody
        username
      }
    }
  }
`;