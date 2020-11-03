import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BANDS } from '../utils/queries'; 
import BandList from '../components/BandList';
import BandForm from '../components/BandForm';
import Auth from '../utils/auth';


const Home = () => {
    const { loading, data } = useQuery(QUERY_BANDS);

    // if data exists, store it in bands
    const bands = data?.bands || [];
    console.log(bands);
  return (
    <main>
      <div>
          {Auth.loggedIn() &&
            <BandForm />
          }
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <BandList bands={bands} />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;