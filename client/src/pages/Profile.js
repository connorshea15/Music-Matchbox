import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });

    const user = data?.user || {};

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div>
        <h3>
            Get to know {user.username}
        </h3>
        <h4>Bio</h4>
        <p>{user.bio}</p>
        <h4>{user.firstName} plays...</h4>
        <ul>
            {user.instruments && 
                user.instruments.map(instrument => (
                    <li>
                        {instrument}
                    </li>
            ))}
        </ul>
        <h4>They play in...</h4>
        <ul>
            {user.bands &&
                user.bands.map(band => (
                    <li>
                        {band.bandName}
                    </li>
            ))}
        </ul>
    </div>
  );
};

export default Profile;