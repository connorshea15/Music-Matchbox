import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THREADS, QUERY_ME } from '../utils/queries'; 
import ThreadList from '../components/ThreadList';
import BandForm from '../components/BandForm';
import Auth from '../utils/auth';

const Messages = () => {
    const { loading, data } = useQuery(QUERY_THREADS);

    const username = Auth.getProfile().data.username;

    var contacts = [];

    // if data exists, store it in bands
    const threads = data?.threads || [];

    var contacts = [];

    for (var i = 0; i < threads.length; i++) {
      if (threads[i].username1 !== username) {
        contacts.push(threads[i].username1);
      } else {
        contacts.push(threads[i].username2)
      }
    };

    console.log("contacts:   " + contacts);
  return (
    <main>
      <div>
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ThreadList 
                  contacts={contacts} 
                />
            )}
        </div>
      </div>
    </main>
  );
};

export default Messages;