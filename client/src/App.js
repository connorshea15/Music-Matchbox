import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';
import Header from './components/Header';
import BandForm from './components/BandForm';

const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <header>
        </header>
        <BandForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
