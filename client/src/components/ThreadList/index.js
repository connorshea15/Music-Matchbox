import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import MessageList from '../MessageList';

const ThreadList = (props) => {

    const {
        contacts,
        username
    } = props

  if (!contacts.length) {
    return <h3>You have no messages</h3>;
  }

  return (
    <div>
      <h3 className="text-center">Your Messages</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center">
            {contacts &&
                contacts.map(contact => (
                    <div className="m-4">
                        <MessageList
                            recipientUsername={contact}
                            username={username}
                        />
                    </div>
            ))}

        </div>
    </div>
  );
};

export default ThreadList;