/*import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERS } from '../utils/queries'; 
import MusicianList from '../components/MusicianList';


const Home = () => {
    const { loading, data } = useQuery(QUERY_USERS);

    // if data exists, store it in bands
    const bands = data?.users || [];
    console.log(bands);
  return (
    <main>
      <div>
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <BandList users={users} />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home; */