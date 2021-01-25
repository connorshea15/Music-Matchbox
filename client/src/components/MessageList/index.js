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

    const [formState, setFormState] = useState({ messageBody: '' });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
        update(cache, { data: { addMessage } }) {
            try{
                const { thread } = cache.readQuery({ query: QUERY_THREAD, variables: { username: recipientUsername } });

                console.log("This is what is in thread object:   " + thread.messages[0].messageBody);

                cache.writeQuery({
                    query: QUERY_THREAD,
                    variables: { username: recipientUsername },
                    data: { thread: { ...thread, messages: [...thread.messages, addMessage] } }
                });

            } catch (e) {
                console.error("This is the error:    " + e);
            } 

            /*const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, threads: [...me.threads, addMessage] } }
            });*/
        }
    });

        // update style of message based on who sent it 
        const styleMessages = (message) => {
            if (message === username) {
                return 'float-right badge-primary';
            } else return 'float-left badge-light';
        };
    
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

        // handleClose();
      
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
                            <div  className="border rounded p-2 d-flex flex-column">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    thread.messages.map((message, index) => (
                                        <div key={index}>
                                            <p className={`badge badge-pill text-wrap mw-75 message-bubble ${styleMessages(message.username)}`}><p className="message-text pt-3 px-2">{message.messageBody}</p></p>
                                        </div>
                                )))}
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