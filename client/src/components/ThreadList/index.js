import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import MessageList from '../MessageList';

const ThreadList = ({ contacts }) => {

  if (!contacts.length) {
    return <h3>You have no messages</h3>;
  }

  return (
    <div>
      <h3 className="text-center">Find Sweet Bands</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center">
            <p>{contacts[0]}   {contacts[1]}</p>
            <MessageList
                recipientUsername={contacts[0]}
            />

        </div>
    </div>
  );
};

export default ThreadList;