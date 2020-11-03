import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const MusicianList = ({ users }) => {
  if (!users.length) {
    return <h3>There are no musicians to see yet!</h3>;
  }

  return (
    <div>
      <h3 className="text-center">Sweet Musicians</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {users &&
            users.map(user => (
                <Card className="m-4" key={user._id}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            <Link to={`/profile/${user.username}`}>
                                {user.username}
                            </Link>
                        </Card.Title>
                        <Card.Text>
                            Musician Contact: {user.email}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <p>Instruments: {user.instruments}</p>
                            {user.instruments && 
                                user.instruments.map(instrument => {
                                    <li>{instrument}</li>
                                })
                            }
                    </Card.Footer>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default MusicianList;