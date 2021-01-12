const { Schema, model } = require('mongoose');

const threadSchema = new Schema(
  {
    username1: {
        type: String,
        required: true
      },
      username2: {
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

module.exports = Thread;