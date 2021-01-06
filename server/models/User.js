const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    firstName: {
        type: String,
        //required: true,
        trim: true
    },
    lastName: {
        type: String,
        //required: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    bio: {
        type: String
    },
    instruments: [
        {
            type: String
        }
    ],
    bands: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Band'
      }
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
  // compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('instrumentCount').get(function() {
    return this.instruments.length;
});

userSchema.virtual('bandCount').get(function() {
    return this.bands.length;
});

const User = model('User', userSchema);

module.exports = User;