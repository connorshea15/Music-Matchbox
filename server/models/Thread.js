const { Schema, model } = require('mongoose');

const threadSchema = new Schema(
  {
    senderUsername: {
      type: String,
      required: true,
    },
    recipientUsername: {
        type: String,
        required: true
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
  }
);

const Thread = model('Thread', threadSchema);

module.exports = Message;