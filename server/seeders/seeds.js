const faker = require('faker');

const db = require('../config/connection');
const { Band, User, Message } = require('../models');

db.once('open', async () => {
  await Band.deleteMany({});
  await User.deleteMany({});
  await Message.deleteMany({});



  console.log('all done!');
  process.exit(0);
});