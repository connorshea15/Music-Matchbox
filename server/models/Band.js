const { Schema, model } = require('mongoose');

const bandSchema = new Schema(
  {
    bandName: {
      type: String,
      required: 'Your band must have a name!',
      minlength: 1,
      maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    genre: {
      type: String
    },
    manager: {
      type: String,
      required: false // maybe should be true
    },
    managerEmail: {
        type: String,
        required: false, // maybe should be true
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    currentInstruments: [
        {
            type: String
        }
    ],
    neededInstruments: [
        {
            type: String
        }
    ],
    video: {
        type: String
    },
    picture: {
        type: String
    }
  }/*,
  {
    toJSON: {
      getters: true
    }
  } */
);

const Band = model('Band', bandSchema);

module.exports = Band;