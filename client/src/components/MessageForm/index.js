import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_MESSAGE } from '../../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { QUERY_BANDS, QUERY_ME } from '../../utils/queries';


const MessageForm = ({ recipientUsername }) => {
    const [formState, setFormState] = useState({ messageBody: '' });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
        update(cache, { data: { addMessage } }) {
           /* try{
                const { messages } = cache.readQuery({ query: QUERY_BANDS });

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
            }); */
        }
    });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
      
            setFormState({
                ...formState,
                [name]: value,
            });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        handleClose();
      
        try {
            const { data } = await addMessage({
                variables: { ...formState, recipientUsername }
            });
        } catch (e) {
            console.error("error: " + e);
        } 
    };

    return (
        <>
            <div className="text-center mb-3">
                <Button variant="primary" className="text-center" onClick={handleShow}>
                    Message {recipientUsername}
                </Button>
            </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send         a Message!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mx-auto">
                            <Form className="border rounded p-2" onSubmit={handleFormSubmit}>
                                <Form.Group controlId="formBasicBandName">
                                    <Form.Label>Add Your Message Here</Form.Label>
                                    <Form.Control as="textarea" rows={3} type="messageBody" name="messageBody" placeholder="Message Content" value={formState.messageBody} onChange={handleChange} />
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

export default MessageForm;