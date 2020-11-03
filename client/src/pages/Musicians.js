import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERS } from '../utils/queries'; 
import MusicianList from '../components/MusicianList';
import Auth from '../utils/auth';


const Musicians = () => {
    const { loading, data } = useQuery(QUERY_USERS);

    // if data exists, store it in bands
    const users = data?.users || [];

    if (!Auth.loggedIn()) {
        return (
          <h4>
            You cannot see this page unless you are logged in! Use navigation above to get in the game!
          </h4>
        );
      }

  return (
    <main>
      <div>
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <MusicianList users={users} />
            )}
        </div>
      </div>
    </main>
  );
};

export default Musicians;