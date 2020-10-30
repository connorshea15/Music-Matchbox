import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';
import Header from './components/Header';
import BandForm from './components/BandForm';
import Home from './pages/Home';
import Login from './pages/Login';

const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Login />
        <header>
        </header>
        <Home />
      </div>
    </ApolloProvider>
  );
}

export default App;
