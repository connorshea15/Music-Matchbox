const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    recipientUsername: {
        type: String,
        required: true
    },
    messageBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
  }
);

const Message = model('Message', messageSchema);

module.exports = Message;