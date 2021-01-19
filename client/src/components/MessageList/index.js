import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_MESSAGE } from '../../utils/mutations';
import { QUERY_THREAD } from '../../utils/queries';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { QUERY_BANDS, QUERY_ME } from '../../utils/queries';

const MessageList = (props) => {

    const {
        recipientUsername,
        username
    } = props

    const { loading, data } = useQuery(QUERY_THREAD, {
        variables: { username: recipientUsername }
    });

    const thread = data?.thread || [];

    /*if (thread) {
        for (var i = 0; i < thread.messages.length; i++) {
            console.log("thread:    " + thread.messages[i]);
        };
    };*/

    const [formState, setFormState] = useState({ messageBody: '' });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); // I may need to do this shit in here

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
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                <div className="text-center mb-3">
                    <Button variant="primary" className="text-center" onClick={handleShow}>
                        {recipientUsername}
                    </Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send {recipientUsername} a Message!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mx-auto">
                            <div  className="border rounded p-2">
                                {thread &&
                                    thread.messages.map(message => (
                                        <div>
                                            <p className={message.username = username ? 'text-right': 'text-left'}>{message.messageBody}</p>
                                        </div>
                                ))}
                            </div>
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
            )}

        </>
    )
};

export default MessageList;