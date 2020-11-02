import React from 'react';
import Card from 'react-bootstrap/Card';

const MusicianList = ({ users }) => {
  if (!users.length) {
    return <h3>There are no musicians to see yet!</h3>;
  }

  return (
    <div>
      <h3>Sweet Musicians</h3>
      {users &&
        users.map(user => (
            <Card key={user._id}>
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>
                        Musician Contact: {user.email}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Instruments: {user.instruments}</small>
                    <ul>
                        {user.instruments && 
                            user.instruments.map(instrument => {
                                <li>{instrument}</li>
                            })
                        }
                    </ul>
                </Card.Footer>
            </Card>
        ))}
    </div>
  );
};

export default MusicianList;