import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile" />;
      }

      if (!user?.username) {
        return (
          <h4>
            You cannot see this page unless you are logged in! Use navigation above to get in the game!
          </h4>
        );
      }

  return (
    <div>
        <h3>
            {userParam ? `Get to know ${user.username}` : 'Your Profile'}
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