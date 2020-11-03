import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BANDS } from '../utils/queries'; 
import Auth from '../utils/auth';

const SingleBand = props => {
    const { bandName: bandName } = useParams();
    
    const { loading, data } = useQuery(QUERY_BANDS, {
        variables: { bandName: bandName }
    });

    const band = data?.bands || {};

    if (loading) {
        return <div>Loading...</div>
    }

    // here I need to link the username to the profile of that user
    // I need to set up the manager email to open up the users default email to send a message

  return (
    <div className="text-center">
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
            <div className="mx-3">
                <img className="img-fluid img-thumbnail w-75 h-75" src={band[0].picture}></img>
            </div>
            <div className="mx-3">
                <h3 className="mt-4">
                    {band[0].bandName}
                </h3>
                <div>
                    <p className="mx-2">Band created by 
                        <Link className="mx-1" to={`/profile/${band[0].username}`}>
                            {band[0].username}
                        </Link>
                    </p>
                    <p className="mx-2">Genre: {band[0].genre}</p>
                </div>
                <p>Manager: {band[0].manager}</p>
                {Auth.loggedIn() &&
                    <p>Reach the manager at  
                        <a className="mx-1" href={`mailto:${band[0].managerEmail}`}>
                            {band[0].managerEmail}
                        </a>
                    </p>
                }
                <h4>Check out their Music
                    <a className="mx-1" href={band[0].video}>
                        Here!!
                    </a>
                </h4>
            </div>
        </div>
    </div>
  );
};

export default SingleBand;