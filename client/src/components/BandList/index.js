import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const BandList = ({ bands }) => {
  if (!bands.length) {
    return <h3>There are no bands to see yet!</h3>;
  }

  return (
    <div>
      <h3>Sweet Bands</h3>
      {bands &&
        bands.map(band => (
            <Card key={band._id}>
                <Card.Img variant="top" src={band.picture} />
                <Card.Body>
                    <Link to={`/band/${band.bandName}`}>
                        <Card.Title>{band.bandName}</Card.Title>
                    </Link>
                    <Card.Text>
                        Genre: {band.genre}
                        Current Instruments: {band.currentInstruments}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Needed Instruments: {band.neededInstruments}</small>
                </Card.Footer>
            </Card>
        ))}
    </div>
  );
};

export default BandList;


