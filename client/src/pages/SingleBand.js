import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BANDS } from '../utils/queries'; 

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
    <div>
        <h3>
            {band[0].bandName}
        </h3>
        <p>Band created by {band[0].username}</p>
        <p>Genre: {band[0].genre}</p>
        <p>Manager: {band[0].manager}</p>
        <p>Reach the manager at {band[0].managerEmail}</p>
    </div>
  );
};

export default SingleBand;