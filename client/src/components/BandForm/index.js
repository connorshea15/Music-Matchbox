import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_BAND } from '../../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { QUERY_BANDS, QUERY_ME } from '../../utils/queries';


const BandForm = () => {
    const [formState, setFormState] = useState({ bandName: '', genre: '', manager: '', managerEmail: '', currentInstruments: [], neededInstruments: [], video: '', picture: '' });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const availableInstruments = ['vocals', 'guitar', 'drums', 'bass', 'keyboard', 'saxophone', 'percussion'];

    const [addBand, { error }] = useMutation(ADD_BAND, {
        update(cache, { data: { addBand } }) {
            try{
                const { bands } = cache.readQuery({ query: QUERY_BANDS });

                cache.writeQuery({
                    query: QUERY_BANDS,
                    data: { bands: [addBand, ...bands] }
                });

            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, bands: [...me.bands, addBand] } }
            });
        }
    });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
      
            setFormState({
                ...formState,
                [name]: value,
            });
      
        console.log(formState);
    };

    const handleInstrumentChange = (event) => {
        const { name, value } = event.target;
        var removed = false;
        var currentArr = [];
        if (name === "currentInstruments") {
            currentArr = formState.currentInstruments;
        } else {
            currentArr = formState.neededInstruments;
        }

        // filter through the instruments state and return elements that are not equal to current value into new array
        const updatedArr = currentArr.filter(x => {
            if (x === value) {
                removed = true;
            }
            return x !== value;
        }); 

        if (removed) {
            setFormState({
                ...formState,
                [name]: updatedArr,
            }); 
        } else {
            setFormState({
                ...formState,
                [name]: currentArr.concat(value),
            }); 
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        handleClose();
      
        try {
            const { data } = await addBand({
                variables: { ...formState }
            });
        } catch (e) {
            console.error("error: " + e);
        } 
    };

    return (
        <>
            <div className="text-center mb-2">
                <Button variant="primary" className="text-center" onClick={handleShow}>
                    Add Your Own Band!
                </Button>
            </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Band Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mx-auto">
                            <Form className="border rounded p-2" onSubmit={handleFormSubmit}>
                                <Form.Group controlId="formBasicBandName">
                                    <Form.Label>Band Name</Form.Label>
                                    <Form.Control type="bandName" name="bandName" placeholder="Add your band's name" value={formState.bandName} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control type="genre" name="genre" placeholder="Enter Genre" value={formState.genre} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicManager">
                                    <Form.Label>Manager</Form.Label>
                                    <Form.Control type="manager" name="manager" placeholder="Manager's Name" value={formState.manager} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicManagerEmail">
                                    <Form.Label>Manager Email</Form.Label>
                                    <Form.Control type="managerEmail" name="managerEmail" placeholder="managerEmail" value={formState.managerEmail} onChange={handleChange} />
                                </Form.Group>
                                <div className="d-flex justify-content-center flex-wrap">
                                    <Form.Group controlId="formBasicCurrentInstruments" className="mx-auto border rounded p-4">
                                        <div>
                                            <Form.Label>Current Instruments (Select all that apply)</Form.Label>
                                            {availableInstruments &&
                                                availableInstruments.map((instrument => (
                                                    <Form.Check
                                                        key={instrument}
                                                        type="checkbox"
                                                        label={instrument}
                                                        id={instrument}
                                                        name="currentInstruments"
                                                        value={instrument}
                                                        onChange={handleInstrumentChange}
                                                    />
                                            )))}
                                        </div>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicNeededInstruments" className="mx-auto border rounded p-4">
                                        <Form.Label>Needed Instruments (Select all that apply)</Form.Label>
                                        {availableInstruments &&
                                            availableInstruments.map((instrument => (
                                                <Form.Check
                                                    key={instrument}
                                                    type="checkbox"
                                                    label={instrument}
                                                    id={instrument}
                                                    name="neededInstruments"
                                                    value={instrument}
                                                    onChange={handleInstrumentChange}
                                                />
                                        )))}
                                    </Form.Group>
                                </div>

                                <Form.Group controlId="formBasicVideo">
                                    <Form.Label>Video</Form.Label>
                                    <Form.Control type="video" name="video" placeholder="URL for Video" value={formState.video} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPicture">
                                    <Form.Label>Picture</Form.Label>
                                    <Form.Control type="text" name="picture" placeholder="URL for Picture" value={formState.picture} onChange={handleChange} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
};

export default BandForm;