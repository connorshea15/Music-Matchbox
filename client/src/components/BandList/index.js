import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const BandList = ({ bands }) => {
  if (!bands.length) {
    return <h3>There are no bands to see yet!</h3>;
  }

  return (
    <div>
      <h3 className="text-center">Sweet Bands</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {bands &&
            bands.map(band => (
                <Card className="m-4" key={band._id}>
                    <Card.Body>
                        <Link to={`/band/${band.bandName}`}>
                            <Card.Title className="text-center">{band.bandName}</Card.Title>
                        </Link>
                        <Card.Text className="text-center">
                            Genre: {band.genre}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex flex-row justify-content-center">
                            <div className="mx-2">
                                <p>Current Instruments:</p>
                                {band.currentInstruments &&
                                    band.currentInstruments.map(x => (
                                        <li>{x}</li>
                                ))}
                            </div>
                            <div className="mx-2">
                                <p>Needed Instruments:</p>
                                {band.neededInstruments &&
                                    band.neededInstruments.map(x => (
                                        <li>{x}</li>
                                ))}
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default BandList;


