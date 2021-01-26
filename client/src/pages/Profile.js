import React, { useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import BandForm from '../components/BandForm';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';

const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const myUsername = Auth.getProfile().data.username;

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
        <div className="text-center">
            <h3>
                {userParam ? `Get to know ${user.username}` : 'Your Profile'}
            </h3>
            <div className="border rounded my-3 mx-5 p-2 bio">
                <h4>Bio</h4>
                <p>{user.bio}</p>
            </div>
            {Auth.loggedIn() && userParam &&
                <div>
                    <h4>Reach {user.username}</h4>
                    <MessageForm
                        recipientUsername={user.username}
                    />
                </div>
            }
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-center my-3">
            <div className="mx-5 bio rounded mb-3 p-2">
                <h4>{user.username} plays...</h4>
                <ul>
                    {user.instruments && 
                        user.instruments.map(instrument => (
                            <li>
                                {instrument}
                            </li>
                    ))}
                </ul>
            </div>
            <div className="mx-5 bio rounded p-2">
                <h4>They play in...</h4>
                <ul>
                    {user.bands &&
                        user.bands.map(band => (
                            <Link to={`/band/${band.bandName}`}>
                                <li>
                                    {band.bandName}
                                </li>
                            </Link>
                    ))}
                </ul>
            </div>
        </div>
        {Auth.loggedIn() &&
            <BandForm />
        }
    </div>
  );
};

export default Profile;